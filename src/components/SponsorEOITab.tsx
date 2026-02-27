export default function SponsorEOITab() {
    return (
        <div className="bg-white p-10 border-t-4 border-secondary hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center h-full">
            <h3 className="font-heading text-3xl font-bold text-primary mb-4 uppercase">Interested in Sponsoring?</h3>
            <p className="font-body text-gray-600 mb-8 flex-grow">
                Support the local community and get great exposure for your business. Apply for our Sponsorship Expression of Interest (EOI).
            </p>
            <a
                href="https://app.360player.com/registration/ecpsc/29ca5f36-bcb1-42a9-b477-bfbdecb7a8d8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary font-heading font-bold text-xl py-4 px-8 hover:bg-primary hover:text-white transition-all uppercase tracking-widest inline-block"
            >
                SPONSOR EOI
            </a>
        </div>
    )
}
