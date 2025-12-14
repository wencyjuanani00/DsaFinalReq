const dsTabs = document.querySelectorAll('.ds-tab');
const tabContents = document.querySelectorAll('.tab-content');

dsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        dsTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${targetTab}-tab`) {
                content.classList.add('active');
                
                const langButtons = content.querySelectorAll('.lang-btn');
                const codeContainers = content.querySelectorAll('.code-container');
                
                if (langButtons.length > 0) {
                    langButtons.forEach(btn => btn.classList.remove('active'));
                    langButtons[0].classList.add('active');
                    
                    codeContainers.forEach(container => {
                        if (container.id.includes('cpp')) {
                            container.style.display = 'block';
                        } else {
                            container.style.display = 'none';
                        }
                    });
                }
            }
        });
    });
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('lang-btn')) {
        const parentTab = e.target.closest('.tab-content');
        const lang = e.target.getAttribute('data-lang');
        
        parentTab.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        parentTab.querySelectorAll('.code-container').forEach(container => {
            if (container.id.includes(lang)) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const algorithmCards = document.querySelectorAll('.algorithm-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        algorithmCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

if (window.location.hash) {
    setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.style.animation = 'pulse 0.5s';
            
            setTimeout(() => {
                element.style.animation = '';
            }, 500);
        }
    }, 300);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
        100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
    }
    
    .algorithm-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
