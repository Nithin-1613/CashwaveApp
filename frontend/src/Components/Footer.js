const Footer = () => {
    return (
        <footer className="footer">
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
            <div className="footer-content">
                <div className="footer-links footerlinkfonts">
                    <a href="/contact-us">Contact Us</a>
                    <a href="/privacy-cookies">Privacy and Cookies</a>
                    <a href="/get-our-app">Get My App</a>
                </div>
                <hr className="footer-line" />
                <div className="footer-bottom">
                    <span className="footer-copyright">&copy; {new Date().getFullYear()} Cashwave</span>
                    <div class="footer-links">
                        <div class="social-icon-box" style={{ backgroundColor: '#1877f2' }}><a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a></div>
                        <div class="social-icon-box" style={{ backgroundColor: '#1da1f2' }}><a href="#" class="social-icon"><i class="fab fa-twitter"></i></a></div>
                        <div class="social-icon-box" style={{ backgroundColor: '#c32aa3' }}><a href="#" class="social-icon"><i class="fab fa-instagram"></i></a></div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
export default Footer;