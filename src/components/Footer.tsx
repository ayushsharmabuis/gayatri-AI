import logo from "@/assets/gayatri-logo.png";

const Footer = () => (
  <footer className="py-12 bg-foreground text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="GayatriAI logo" className="w-16 h-16 object-contain" />
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-gradient-saffron">GayatriAI</h3>
          </div>
          <p className="text-sm text-primary-foreground/60">Your trusted AI-powered Vedic astrology companion</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3 text-primary-foreground/80">Quick Links</h4>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Privacy Policy</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Terms & Conditions</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Contact Us</p>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-3 text-primary-foreground/80">Connect</h4>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">WhatsApp</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Instagram</p>
            <p className="hover:text-primary-foreground cursor-pointer transition-colors">Twitter</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
        © 2026 GayatriAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
