
let currentStep = 1;
const totalSteps = 3;

// Show payment method specific fields
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function () {
        document.getElementById('creditCardFields').classList.add('hidden');
        document.getElementById('bankTransferFields').classList.add('hidden');

        if (this.value === 'credit') {
            document.getElementById('creditCardFields').classList.remove('hidden');
            document.getElementById('creditCardFields').classList.add('animate__fadeIn');
        } else if (this.value === 'bank') {
            document.getElementById('bankTransferFields').classList.remove('hidden');
            document.getElementById('bankTransferFields').classList.add('animate__fadeIn');
        }
    });
});

function updateProgressBar() {
    const progressPercentage = (currentStep / totalSteps) * 100;
    document.getElementById('progress').style.width = `${progressPercentage}%`;
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(element => {
        element.classList.remove('active');
    });

    document.getElementById(`step-${step}`).classList.add('active');
    updateProgressBar();
}

function nextStep() {
    if (validateStep(currentStep)) {
        currentStep++;
        if (currentStep > totalSteps) {
            currentStep = totalSteps;
        }
        showStep(currentStep);
    }
}

function prevStep() {
    currentStep--;
    if (currentStep < 1) {
        currentStep = 1;
    }
    showStep(currentStep);
}

function validateStep(step) {
    let isValid = true;

    // Reset all error states
    document.querySelectorAll('.input-error').forEach(element => {
        element.classList.remove('input-error');
    });
    document.querySelectorAll('.error-message').forEach(element => {
        element.classList.add('hidden');
    });

    if (step === 1) {
        // Validate personal information
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked');

        if (!firstName) {
            document.getElementById('firstName').classList.add('input-error');
            document.getElementById('firstName-error').classList.remove('hidden');
            isValid = false;
        }

        if (!lastName) {
            document.getElementById('lastName').classList.add('input-error');
            document.getElementById('lastName-error').classList.remove('hidden');
            isValid = false;
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            document.getElementById('email').classList.add('input-error');
            document.getElementById('email-error').classList.remove('hidden');
            isValid = false;
        }

        if (!phone || !/^[\d\s\-()+]{10,}$/.test(phone)) {
            document.getElementById('phone').classList.add('input-error');
            document.getElementById('phone-error').classList.remove('hidden');
            isValid = false;
        }

        if (!dob) {
            document.getElementById('dob').classList.add('input-error');
            document.getElementById('dob-error').classList.remove('hidden');
            isValid = false;
        }

        if (!gender) {
            document.getElementById('gender-error').classList.remove('hidden');
            isValid = false;
        }
    } else if (step === 2) {
        // Validate academic information
        const degree = document.getElementById('degree').value;
        const year = document.getElementById('year').value;
        const institution = document.getElementById('institution').value.trim();
        const gpa = document.getElementById('gpa').value.trim();
        const qualification = document.getElementById('qualification').value.trim();

        if (!degree) {
            document.getElementById('degree').classList.add('input-error');
            document.getElementById('degree-error').classList.remove('hidden');
            isValid = false;
        }

        if (!year) {
            document.getElementById('year').classList.add('input-error');
            document.getElementById('year-error').classList.remove('hidden');
            isValid = false;
        }

        if (!institution) {
            document.getElementById('institution').classList.add('input-error');
            document.getElementById('institution-error').classList.remove('hidden');
            isValid = false;
        }

        if (!gpa || !/^[0-9.]{1,5}$/.test(gpa)) {
            document.getElementById('gpa').classList.add('input-error');
            document.getElementById('gpa-error').classList.remove('hidden');
            isValid = false;
        }

        if (!qualification) {
            document.getElementById('qualification').classList.add('input-error');
            document.getElementById('qualification-error').classList.remove('hidden');
            isValid = false;
        }
    } else if (step === 3) {
        // Validate payment information
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        const terms = document.getElementById('terms').checked;

        if (!paymentMethod) {
            document.getElementById('paymentMethod-error').classList.remove('hidden');
            isValid = false;
        } else if (paymentMethod.value === 'credit') {
            // Validate credit card fields if credit card is selected
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const cardName = document.getElementById('cardName').value.trim();
            const expiryDate = document.getElementById('expiryDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!cardNumber || !/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
                document.getElementById('cardNumber').classList.add('input-error');
                document.getElementById('cardNumber-error').classList.remove('hidden');
                isValid = false;
            }

            if (!cardName) {
                document.getElementById('cardName').classList.add('input-error');
                document.getElementById('cardName-error').classList.remove('hidden');
                isValid = false;
            }

            if (!expiryDate || !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate)) {
                document.getElementById('expiryDate').classList.add('input-error');
                document.getElementById('expiryDate-error').classList.remove('hidden');
                isValid = false;
            }

            if (!cvv || !/^\d{3,4}$/.test(cvv)) {
                document.getElementById('cvv').classList.add('input-error');
                document.getElementById('cvv-error').classList.remove('hidden');
                isValid = false;
            }
        }

        if (!terms) {
            document.getElementById('terms-error').classList.remove('hidden');
            isValid = false;
        }

        // If all validations pass, submit the form
        if (isValid) {
            submitForm();
        }
    }

    return isValid;
}

function createConfetti() {
    const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function submitForm() {
    // Collect form data
    const formData = {
        personal: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            gender: document.querySelector('input[name="gender"]:checked').value
        },
        academic: {
            degree: document.getElementById('degree').value,
            degreeText: document.getElementById('degree').options[document.getElementById('degree').selectedIndex].text,
            year: document.getElementById('year').value,
            institution: document.getElementById('institution').value,
            gpa: document.getElementById('gpa').value,
            qualification: document.getElementById('qualification').value
        },
        payment: {
            method: document.querySelector('input[name="paymentMethod"]:checked').value,
            cardNumber: document.getElementById('cardNumber')?.value,
            cardName: document.getElementById('cardName')?.value,
            expiryDate: document.getElementById('expiryDate')?.value,
            cvv: document.getElementById('cvv')?.value
        }
    };

    // Generate random application ID
    const applicationId = 'UNI-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    // Format date of birth
    const formattedDob = new Date(formData.personal.dob).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create success message HTML
    const successHtml = `
            <div class="success-message animate__animated animate__fadeIn">
                <div class="text-center p-8">
                    <!-- Animated Checkmark -->
                    <div class="checkmark-container mb-6">
                        <svg class="checkmark animate__animated animate__bounceIn" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    
                    <!-- Success Title -->
                    <h2 class="text-3xl font-bold text-gray-800 mb-3 animate__animated animate__fadeIn">Application Submitted!</h2>
                    <p class="text-lg text-gray-600 mb-6 animate__animated animate__fadeIn">Thank you for applying to our university.</p>
                    
                    <!-- Application Summary -->
                    <div class="bg-indigo-50 rounded-xl p-6 mb-8 text-left animate__animated animate__fadeIn">
                        <h3 class="font-semibold text-indigo-800 text-lg mb-4 border-b pb-2">Your Application Details</h3>
                        
                        <!-- Personal Information -->
                        <div class="mb-4">
                            <h4 class="font-medium text-gray-700 mb-2 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                Personal Information
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <p><span class="font-medium">Full Name:</span> ${formData.personal.firstName} ${formData.personal.lastName}</p>
                                <p><span class="font-medium">Email:</span> ${formData.personal.email}</p>
                                <p><span class="font-medium">Phone:</span> ${formData.personal.phone}</p>
                                <p><span class="font-medium">Date of Birth:</span> ${formattedDob}</p>
                                <p><span class="font-medium">Gender:</span> ${formData.personal.gender.charAt(0).toUpperCase() + formData.personal.gender.slice(1)}</p>
                            </div>
                        </div>
                        
                        <!-- Academic Information -->
                        <div class="mb-4">
                            <h4 class="font-medium text-gray-700 mb-2 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                                Academic Information
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <p><span class="font-medium">Program:</span> ${formData.academic.degreeText}</p>
                                <p><span class="font-medium">Intake Year:</span> ${formData.academic.year}</p>
                                <p><span class="font-medium">Previous Institution:</span> ${formData.academic.institution}</p>
                                <p><span class="font-medium">GPA/Percentage:</span> ${formData.academic.gpa}</p>
                                <p><span class="font-medium">Highest Qualification:</span> ${formData.academic.qualification}</p>
                            </div>
                        </div>
                        
                        <!-- Payment Information -->
                        <div>
                            <h4 class="font-medium text-gray-700 mb-2 flex items-center">
                                <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                Payment Information
                            </h4>
                            <div class="text-sm">
                                <p><span class="font-medium">Payment Method:</span> ${formData.payment.method === 'credit' ? 'Credit Card' : formData.payment.method === 'bank' ? 'Bank Transfer' : 'Other'}</p>
                                ${formData.payment.method === 'credit' ? `
                                    <p class="mt-2"><span class="font-medium">Card Ending With:</span> •••• ${formData.payment.cardNumber.slice(-4)}</p>
                                ` : ''}
                            </div>
                        </div>
                        
                        <!-- Application ID -->
                        <div class="mt-6 pt-4 border-t">
                            <p class="flex items-center text-indigo-600 font-medium">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                                Application ID: ${applicationId}
                            </p>
                        </div>
                    </div>
                    
                    <!-- Next Steps -->
                    <div class="mb-8 text-left max-w-md mx-auto animate__animated animate__fadeIn">
                        <h3 class="font-medium text-gray-800 mb-3">What happens next?</h3>
                        <ul class="text-sm text-gray-600 space-y-2">
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-1 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                                </svg>
                                <span>Confirmation email sent to <span class="font-medium">${formData.personal.email}</span></span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-1 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                                </svg>
                                <span>Admissions review within 2-3 weeks</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-1 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                                </svg>
                                <span>Interview scheduling if required</span>
                            </li>
                            <li class="flex items-start">
                                <svg class="w-4 h-4 mt-1 mr-2 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                                </svg>
                                <span>Final decision notification</span>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row justify-center gap-4 animate__animated animate__fadeIn">
                        <button onclick="window.print()" class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                            Print Confirmation
                        </button>
                        <a href="/index.html" class="px-6 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition font-medium text-center">
                            Return to Homepage
                        </a>
                    </div>
                </div>
            </div>
            `;

    // Replace form with success message
    document.querySelector('.form-container').innerHTML = successHtml;

    // Create confetti effect
    createConfetti();
}

// Initialize the form
document.addEventListener('DOMContentLoaded', function () {
    updateProgressBar();

    // Submit button event listener
    document.getElementById('submitBtn').addEventListener('click', function () {
        validateStep(currentStep);
    });
});
