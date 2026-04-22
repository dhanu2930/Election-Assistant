document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timeline-container');
    const emptyState = document.getElementById('empty-state');
    const detailsContent = document.getElementById('details-content');
    
    // Elements to update
    const detailBadge = document.getElementById('detail-badge');
    const detailTitle = document.getElementById('detail-title');
    const detailTimeframe = document.getElementById('detail-timeframe');
    const detailDesc = document.getElementById('detail-desc');
    const detailSteps = document.getElementById('detail-steps');

    let activePhaseId = null;

    // Initialize Timeline
    function initTimeline() {
        electionPhases.forEach((phase, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.dataset.id = phase.id;
            
            // Stagger animation delay
            item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
            
            item.innerHTML = `
                <div class="timeline-title">${phase.title}</div>
                <div class="timeline-timeframe">${phase.timeframe}</div>
            `;
            
            item.addEventListener('click', () => selectPhase(phase.id));
            timelineContainer.appendChild(item);
        });
        
        // Add dynamic CSS for timeline animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        // Optionally auto-select the first phase
        // selectPhase(electionPhases[0].id);
    }

    function selectPhase(phaseId) {
        if (activePhaseId === phaseId) return;
        activePhaseId = phaseId;

        // Update active class on timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            if (item.dataset.id === phaseId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Find the selected phase data
        const phaseData = electionPhases.find(p => p.id === phaseId);
        if (!phaseData) return;

        // Hide empty state and show details with a quick animation reset
        emptyState.classList.add('hidden');
        
        // Reset animation by removing and re-adding the class
        detailsContent.classList.remove('details-content');
        void detailsContent.offsetWidth; // trigger reflow
        detailsContent.classList.add('details-content');
        
        detailsContent.classList.remove('hidden');

        // Populate details
        detailBadge.textContent = phaseData.phase;
        detailTitle.textContent = phaseData.title;
        detailTimeframe.textContent = phaseData.timeframe;
        detailDesc.textContent = phaseData.description;

        // Populate steps
        detailSteps.innerHTML = '';
        phaseData.steps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            detailSteps.appendChild(li);
        });
    }

    // Run initialization
    initTimeline();
});
