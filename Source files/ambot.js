// --- DOM Elements ---
const screens = {
    signin: document.getElementById('signin-screen'),
    signupStep1: document.getElementById('signup-step1'),
    signupStep2: document.getElementById('signup-step2'),
    signupStep3: document.getElementById('signup-step3'),
    welcome: document.getElementById('welcome-screen'),
    forgotPassword: document.getElementById('forgot-password-screen')
};

const screenTitle = document.querySelector('.auth-title');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const phoneInput = document.getElementById('phone');
const userIdInput = document.getElementById('user-id');
const dobInput = document.getElementById('date-of-birth');
const termsCheckbox = document.getElementById('terms');
const reviewInfo = document.getElementById('review-info');
const welcomeMessage = document.getElementById('welcome-message');
const resetEmailInput = document.getElementById('reset-email');

// Error elements
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const emailError = document.getElementById('email-error');
const newPasswordError = document.getElementById('new-password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');
const phoneError = document.getElementById('phone-error');
const userIdError = document.getElementById('user-id-error');
const dobError = document.getElementById('dob-error');
const termsError = document.getElementById('terms-error');
const resetEmailError = document.getElementById('reset-email-error');

// --- Functions ---
function showScreen(screen) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
    // If showing the confirmation screen, refresh the review info from inputs
    if (screen === screens.signupStep3) {
        updateReviewInfo();
    }
}

function updateReviewInfo() {
    reviewInfo.innerHTML = `
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>Full Name:</strong> ${firstNameInput.value} ${lastNameInput.value}</p>
        <p><strong>Phone:</strong> ${phoneInput.value || 'Not provided'}</p>
        <p><strong>ID:</strong> ${userIdInput.value}</p>
        <p><strong>Date of Birth:</strong> ${dobInput.value || 'Not provided'}</p>
    `;
}

function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePassword(password) { return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password); }
function validatePhone(phone) { return /^\d{11}$/.test(phone.replace(/\D/g, '')); }
function validateDOB(dob) {
    if (!dob) return true;
    const birthDate = new Date(dob), today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if(today.getMonth()<birthDate.getMonth()||(today.getMonth()===birthDate.getMonth()&&today.getDate()<birthDate.getDate())) age--;
    return age>=13;
}
function showError(el, msg){ el.textContent=msg; el.style.display='block'; }
function hideError(el){ el.style.display='none'; }

// --- Event Listeners ---
document.getElementById('go-to-signup').addEventListener('click', e=>{ e.preventDefault(); showScreen(screens.signupStep1); });
document.getElementById('go-to-signin-from-step1').addEventListener('click', e=>{ e.preventDefault(); showScreen(screens.signin); });
document.getElementById('forgot-password').addEventListener('click', e=>{ e.preventDefault(); showScreen(screens.forgotPassword); });
document.getElementById('back-to-signin').addEventListener('click', e=>{ e.preventDefault(); showScreen(screens.signin); });

document.getElementById('step1-next').addEventListener('click', ()=>{
    let valid=true;
    if(!emailInput.value){ showError(emailError,'Email is required'); valid=false; } 
    else if(!validateEmail(emailInput.value)){ showError(emailError,'Invalid email'); valid=false; } 
    else hideError(emailError);

    if(!newPasswordInput.value){ showError(newPasswordError,'Password required'); valid=false; } 
    else if(!validatePassword(newPasswordInput.value)){ showError(newPasswordError,'Password must be 8+ chars with uppercase, lowercase, number'); valid=false; } 
    else hideError(newPasswordError);

    if(!confirmPasswordInput.value){ showError(confirmPasswordError,'Confirm password'); valid=false; } 
    else if(newPasswordInput.value!==confirmPasswordInput.value){ showError(confirmPasswordError,'Passwords do not match'); valid=false; } 
    else hideError(confirmPasswordError);

    if(valid) showScreen(screens.signupStep2);
});

document.getElementById('step2-back').addEventListener('click', ()=>{ showScreen(screens.signupStep1); });
document.getElementById('step2-next').addEventListener('click', ()=>{
    let valid=true;
    if(!firstNameInput.value){ showError(firstNameError,'First name required'); valid=false; } else hideError(firstNameError);
    if(!lastNameInput.value){ showError(lastNameError,'Last name required'); valid=false; } else hideError(lastNameError);
    if(phoneInput.value&&!validatePhone(phoneInput.value)){ showError(phoneError,'Please enter a valid 11-digit phone number'); valid=false; } else hideError(phoneError);
    if(!userIdInput.value){ showError(userIdError,'ID is required'); valid=false; } else hideError(userIdError);
    if(dobInput.value&&!validateDOB(dobInput.value)){ showError(dobError,'Must be 13+'); valid=false; } else hideError(dobError);
    if(valid) showScreen(screens.signupStep3);
});
document.getElementById('step3-back').addEventListener('click', ()=>{ showScreen(screens.signupStep2); });

document.getElementById('complete-registration').addEventListener('click', ()=>{
    if(!termsCheckbox.checked){ showError(termsError,'Agree to terms'); return; } else hideError(termsError);
    showScreen(screens.welcome);
});

document.getElementById('signin-btn').addEventListener('click', ()=>{
    let valid=true;
    if(!usernameInput.value){ showError(usernameError,'Required'); valid=false; } else hideError(usernameError);
    if(!passwordInput.value){ showError(passwordError,'Required'); valid=false; } else hideError(passwordError);
    if(valid){ showScreen(screens.welcome); }
});

// --- Dashboard action logic & notifications ---
function notify(message, ms=3000){
    const container = document.getElementById('notifications');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    container.appendChild(t);
    // force reflow then show
    requestAnimationFrame(()=> t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=> container.removeChild(t),220); }, ms);
}

const binEl = document.getElementById('bin');
document.getElementById('open-lid').addEventListener('click', ()=>{
    binEl.classList.add('open');
    notify('Lid opened');
});
document.getElementById('close-lid').addEventListener('click', ()=>{
    binEl.classList.remove('open');
    notify('Lid closed');
});
document.getElementById('compact').addEventListener('click', ()=>{
    binEl.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(0.96)' },
        { transform: 'scale(1)' }
    ], { duration: 450, easing: 'ease-in-out' });
    notify('Compacted the trash');
});

// On successful login: show troll image 
const headerLogo = document.querySelector('.logo');
document.getElementById('signin-btn').addEventListener('click', ()=>{
    if(usernameInput.value && passwordInput.value){
        try{ headerLogo.src = 'basura.png'; } catch(e){}
        notify('Logged in — troll mode enabled');
    }
});

document.getElementById('send-reset-link').addEventListener('click', ()=>{
    if(!resetEmailInput.value){ showError(resetEmailError,'Email required'); return; } 
    if(!validateEmail(resetEmailInput.value)){ showError(resetEmailError,'Invalid email'); return; }
    hideError(resetEmailError);
    alert('Password reset link has been sent to your email!');
    showScreen(screens.signin);
});

document.getElementById('logout-btn').addEventListener('click', ()=>{
    [usernameInput,passwordInput,emailInput,newPasswordInput,confirmPasswordInput,firstNameInput,lastNameInput,phoneInput,userIdInput,dobInput,termsCheckbox,resetEmailInput].forEach(el=>el.value='');
    termsCheckbox.checked=false;
    document.querySelectorAll('.error-message').forEach(el=>el.style.display='none');
    showScreen(screens.signin);
});

confirmPasswordInput.addEventListener('input', ()=>{
    if(newPasswordInput.value && confirmPasswordInput.value && newPasswordInput.value!==confirmPasswordInput.value){ showError(confirmPasswordError,'Passwords do not match'); }
    else hideError(confirmPasswordError);
});

// --- Password Toggle Visibility (Signup) ---
document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if(input.type === 'password'){
            input.type = 'text';
            btn.textContent = '👁️‍🗨️';
        } else {
            input.type = 'password';
            btn.textContent = '👁️';
        }
    });
});

// --- Keyboard: Enter key behavior ---
// Pressing Enter will activate the primary action for the current screen
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;

    const activeEl = document.activeElement;

    // Avoid interfering with multiline inputs (if any)
    if (activeEl && (activeEl.tagName === 'TEXTAREA')) return;

    // Helper to trigger button by id
    function trigger(id) {
        const btn = document.getElementById(id);
        if (btn) { btn.click(); e.preventDefault(); }
    }

    // Sign-in screen: Enter anywhere inside the sign-in screen triggers sign in
    if (screens.signin.classList.contains('active') && screens.signin.contains(activeEl)) {
        trigger('signin-btn');
        return;
    }

    // Signup step 1: press Enter to go to step 2
    if (screens.signupStep1.classList.contains('active') && screens.signupStep1.contains(activeEl)) {
        trigger('step1-next');
        return;
    }

    // Signup step 2: press Enter to go to step 3
    if (screens.signupStep2.classList.contains('active') && screens.signupStep2.contains(activeEl)) {
        trigger('step2-next');
        return;
    }

    // Signup step 3: press Enter to complete registration (if focused inside)
    if (screens.signupStep3.classList.contains('active') && screens.signupStep3.contains(activeEl)) {
        trigger('complete-registration');
        return;
    }
});
