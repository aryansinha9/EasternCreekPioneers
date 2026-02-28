'use server'

export async function submitContactForm(formData: FormData) {
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
        console.error('Web3Forms Access Key is missing. Please add WEB3FORMS_ACCESS_KEY to your .env.local file.');
        return { success: false, error: 'Server configuration error: Missing API Key' };
    }

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    if (!name || !phone || !message || !email) {
        return { success: false, error: 'Please fill in all required fields.' };
    }

    // Prepare data for Web3Forms API
    const data = {
        access_key: accessKey,
        subject: `New Inquiry from Eastern Creek SC Website - ${name}`,
        from_name: 'Eastern Creek SC Form',
        name: name,
        email: email, // This allows the secretary to hit "Reply"
        phone: phone,
        message: message,
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            return { success: true, message: 'Message sent successfully.' };
        } else {
            console.error('Web3Forms Error:', result);
            return { success: false, error: result.message || 'Failed to send message.' };
        }
    } catch (error) {
        console.error('Submission Catch Error:', error);
        return { success: false, error: 'An unexpected error occurred. Please try again later.' };
    }
}
