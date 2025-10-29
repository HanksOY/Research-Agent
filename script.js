// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize avatar canvas
    const canvas = document.getElementById('avatarCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 200;
        
        // Draw a simple placeholder avatar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(100, 80, 50, 0, 2 * Math.PI); // Head
        ctx.fill();
        
        ctx.fillStyle = 'rgba(128, 128, 128, 0.8)';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('😊', 100, 80);
    }

    // Send button event listener
    const sendBtn = document.getElementById('sendBtn');
    const micBtn = document.getElementById('micBtn');
    const userInput = document.getElementById('userInput');
    const resultsContent = document.getElementById('resultsContent');
    const runStatus = document.getElementById('runStatus');

    sendBtn.addEventListener('click', function() {
        const query = userInput.value.trim();
        if (!query) {
            alert('Please enter a research question');
            return;
        }

        // Disable input during processing
        sendBtn.disabled = true;
        userInput.disabled = true;

        // Update status
        runStatus.textContent = 'Running...';
        runStatus.className = 'badge bg-warning ms-2';

        // Clear previous results
        resultsContent.innerHTML = '';
        
        // Simulate agent execution
        simulateAgentRun();

        // Re-enable after a delay
        setTimeout(() => {
            sendBtn.disabled = false;
            userInput.disabled = false;
            runStatus.textContent = 'Complete';
            runStatus.className = 'badge bg-success ms-2';
        }, 5000);
    });

    // Keyboard shortcut: Enter sends (Shift+Enter for new line)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    function simulateAgentRun() {
        // Update trace badges in sequence
        const steps = [
            { badge: 'planBadge', content: 'collapsePlan', delay: 500 },
            { badge: 'searchBadge', content: 'collapseSearch', delay: 1500 },
            { badge: 'extractBadge', content: 'collapseExtract', delay: 2500 },
            { badge: 'synthesizeBadge', content: 'collapseSynthesize', delay: 3500 }
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                const badge = document.getElementById(step.badge);
                if (badge) {
                    badge.textContent = 'Running...';
                    badge.className = 'badge bg-warning ms-2';
                }
            }, step.delay);

            setTimeout(() => {
                const badge = document.getElementById(step.badge);
                const collapse = document.getElementById(step.content);
                if (badge) {
                    badge.textContent = 'Complete';
                    badge.className = 'badge bg-success ms-2';
                }
                if (collapse && index === steps.length - 1) {
                    // Auto-expand synthesis step
                    const accordionButton = collapse.previousElementSibling.querySelector('button');
                    if (accordionButton) {
                        accordionButton.click();
                    }
                }
            }, step.delay + 1000);
        });

        // Stream demo result text
        const demoResult = `This is a sample research result about the topic you queried. The system has gathered information from multiple sources [1] [2] and synthesized key findings. 

Key points discovered:
• Important finding 1 with detailed explanation
• Important finding 2 with supporting evidence
• Important finding 3 referencing additional research

<a href="#traceAccordion" class="scroll-to-trace">View sources</a>`;

        streamText(demoResult);
    }

    function streamText(text) {
        const words = text.split(' ');
        let index = 0;

        const interval = setInterval(() => {
            if (index >= words.length) {
                clearInterval(interval);
                return;
            }

            let word = words[index];
            resultsContent.innerHTML += word + ' ';
            index++;

            // Scroll to bottom
            resultsContent.scrollTop = resultsContent.scrollHeight;
        }, 80);

        // Make "View sources" link functional after streaming completes
        setTimeout(() => {
            const viewSourcesLink = document.querySelector('.scroll-to-trace');
            if (viewSourcesLink) {
                viewSourcesLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const traceAccordion = document.getElementById('traceAccordion');
                    if (traceAccordion) {
                        traceAccordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }
        }, words.length * 80);
    }
});

