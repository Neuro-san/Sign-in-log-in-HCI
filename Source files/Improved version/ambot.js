// --- DOM Elements ---
const screens = {
    signin: document.getElementById('signin-screen'),
    signupStep1: document.getElementById('signup-step1'),
    signupStep2: document.getElementById('signup-step2'),
    signupStep3: document.getElementById('signup-step3'),
    welcome: document.getElementById('welcome-screen'),
    forgotPassword: document.getElementById('forgot-password-screen')
};

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
const resetStatusEl = document.getElementById('reset-status');

// Errors
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

// --- Utility Functions ---
function showScreen(screen) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screen.classList.add('active');

    if (screen === screens.signupStep3) {
        updateReviewInfo();
    }
}

function updateReviewInfo() {
    const fullName = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`.trim();

    reviewInfo.innerHTML = `
        <p><strong>Email:</strong> ${emailInput.value || 'Not provided'}</p>
        <p><strong>Full Name:</strong> ${fullName || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${phoneInput.value || 'Not provided'}</p>
        <p><strong>ID:</strong> ${userIdInput.value || 'Not provided'}</p>
        <p><strong>Date of Birth:</strong> ${dobInput.value || 'Not provided'}</p>
    `;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

function validatePhone(phone) {
    return /^\d{11}$/.test(phone.replace(/\D/g, ''));
}

function validateDOB(dob) {
    if (!dob) return true;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    return age >= 13;
}

function showError(el, msg) {
    el.textContent = msg;
    el.style.display = 'block';
}

function hideError(el) {
    el.style.display = 'none';
}

// --- Navigation Events ---
document.getElementById('go-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(screens.signupStep1);
});

document.getElementById('go-to-signin-from-step1').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(screens.signin);
});

document.getElementById('forgot-password').addEventListener('click', (e) => {
    e.preventDefault();
    resetStatusEl.style.display = 'none';
    showScreen(screens.forgotPassword);
});

document.getElementById('back-to-signin').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen(screens.signin);
});

// --- Signup Step 1 ---
document.getElementById('step1-next').addEventListener('click', () => {
    let valid = true;

    if (!emailInput.value) {
        showError(emailError, 'Email is required');
        valid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailError, 'Invalid email');
        valid = false;
    } else hideError(emailError);

    if (!newPasswordInput.value) {
        showError(newPasswordError, 'Password required');
        valid = false;
    } else if (!validatePassword(newPasswordInput.value)) {
        showError(newPasswordError, 'Password must contain required conditions');
        valid = false;
    } else hideError(newPasswordError);

    if (!confirmPasswordInput.value) {
        showError(confirmPasswordError, 'Confirm password');
        valid = false;
    } else if (newPasswordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordError, 'Passwords do not match');
        valid = false;
    } else hideError(confirmPasswordError);

    if (valid) showScreen(screens.signupStep2);
});

// --- Signup Step 2 ---
document.getElementById('step2-back').addEventListener('click', () => {
    showScreen(screens.signupStep1);
});

document.getElementById('step2-next').addEventListener('click', () => {
    let valid = true;

    if (!firstNameInput.value) {
        showError(firstNameError, 'First name required');
        valid = false;
    } else hideError(firstNameError);

    if (!lastNameInput.value) {
        showError(lastNameError, 'Last name required');
        valid = false;
    } else hideError(lastNameError);

    if (phoneInput.value && !validatePhone(phoneInput.value)) {
        showError(phoneError, 'Enter valid 11-digit number');
        valid = false;
    } else hideError(phoneError);

    if (!userIdInput.value) {
        showError(userIdError, 'ID is required');
        valid = false;
    } else hideError(userIdError);

    if (dobInput.value && !validateDOB(dobInput.value)) {
        showError(dobError, 'Must be 13+');
        valid = false;
    } else hideError(dobError);

    if (valid) showScreen(screens.signupStep3);
});

// --- Signup Step 3 ---
document.getElementById('step3-back').addEventListener('click', () => {
    showScreen(screens.signupStep2);
});

document.getElementById('complete-registration').addEventListener('click', () => {
    if (!termsCheckbox.checked) {
        showError(termsError, 'Agree to terms');
        return;
    }
    hideError(termsError);
    showScreen(screens.welcome);
});

// --- Sign In ---
document.getElementById('signin-btn').addEventListener('click', () => {
    let valid = true;

    if (!usernameInput.value) {
        showError(usernameError, 'Required');
        valid = false;
    } else hideError(usernameError);

    if (!passwordInput.value) {
        showError(passwordError, 'Required');
        valid = false;
    } else hideError(passwordError);

    if (valid) {
        showScreen(screens.welcome);
    }
});

// --- Dashboard Notifications ---
function notify(message, ms = 3000) {
    const container = document.getElementById('notifications');
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;

    container.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));

    setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => container.removeChild(t), 200);
    }, ms);
}

// Bin controls
const binEl = document.getElementById('bin');

document.getElementById('open-lid').addEventListener('click', () => {
    binEl.classList.add('open');
    notify('Lid opened');
});

document.getElementById('close-lid').addEventListener('click', () => {
    binEl.classList.remove('open');
    notify('Lid closed');
});

document.getElementById('compact').addEventListener('click', () => {
    binEl.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(0.96)' }, { transform: 'scale(1)' }],
        { duration: 450, easing: 'ease-in-out' }
    );
    notify('Compacted');
});

// --- Reset Link ---
document.getElementById('send-reset-link').addEventListener('click', () => {
    resetStatusEl.style.display = 'none';

    if (!resetEmailInput.value) {
        showError(resetEmailError, 'Email required');
        return;
    }

    if (!validateEmail(resetEmailInput.value)) {
        showError(resetEmailError, 'Invalid email');
        return;
    }

    hideError(resetEmailError);

    resetStatusEl.textContent = `Code sent to ${resetEmailInput.value}`;
    resetStatusEl.style.display = 'block';

    setTimeout(() => {
        resetStatusEl.style.display = 'none';
    }, 7000);
});

// --- Logout ---
document.getElementById('logout-btn').addEventListener('click', () => {
    [
        usernameInput, passwordInput, emailInput,
        newPasswordInput, confirmPasswordInput,
        firstNameInput, lastNameInput, phoneInput,
        userIdInput, dobInput, termsCheckbox, resetEmailInput
    ].forEach(el => {
        try { el.value = ''; } catch {}
    });

    termsCheckbox.checked = false;
    document.querySelectorAll('.error-message').forEach(n => n.style.display = 'none');

    resetStatusEl.style.display = 'none';

    showScreen(screens.signin);
});

// --- Confirm Password Live Check ---
confirmPasswordInput.addEventListener('input', () => {
    if (
        newPasswordInput.value &&
        confirmPasswordInput.value &&
        newPasswordInput.value !== confirmPasswordInput.value
    ) {
        showError(confirmPasswordError, 'Passwords do not match');
    } else {
        hideError(confirmPasswordError);
    }
});

// --- Show Password Toggle ---
document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
        } else {
            input.type = 'password';
            btn.textContent = '👁️';
        }
    });
});

// --- Password Rule Visibility ---
const passwordRulesEl = document.getElementById('password-rules');

newPasswordInput.addEventListener('input', () => {
    if (newPasswordInput.value && !validatePassword(newPasswordInput.value)) {
        passwordRulesEl.style.display = 'block';
    } else {
        passwordRulesEl.style.display = 'none';
    }
});

// --- Phone Input: Numeric + Max 11 Digits ---
phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    phoneInput.value = digits;
});

// --- Enter Key → Trigger Primary Buttons Only ---
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    const activeEl = document.activeElement;

    if (activeEl && activeEl.tagName === 'TEXTAREA') return;

    function trigger(id) {
        const btn = document.getElementById(id);
        if (btn) { btn.click(); e.preventDefault(); }
    }

    if (screens.signin.classList.contains('active')) trigger('signin-btn');
    if (screens.signupStep1.classList.contains('active')) trigger('step1-next');
    if (screens.signupStep2.classList.contains('active')) trigger('step2-next');
    if (screens.signupStep3.classList.contains('active')) trigger('complete-registration');
    if (screens.forgotPassword.classList.contains('active')) trigger('send-reset-link');
});

// --- Auto-focus First Field ---
Object.values(screens).forEach(s => {
    new MutationObserver(() => {
        if (s.classList.contains('active')) {
            const first = s.querySelector('input, button, select');
            if (first) first.focus();
        }
    }).observe(s, { attributes: true, attributeFilter: ['class'] });
});
