import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const clientsData = [
  { name: 'Microsoft', domain: 'microsoft.com' },
  { name: 'Google', domain: 'google.com' },
  { name: 'Amazon', domain: 'amazon.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'NVIDIA', domain: 'nvidia.com' },
  { name: 'Intel', domain: 'intel.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Oracle', domain: 'oracle.com' },
  { name: 'Salesforce', domain: 'salesforce.com' },
  { name: 'Adobe', domain: 'adobe.com' },
  { name: 'Netflix', domain: 'netflix.com' },
  { name: 'Spotify', domain: 'spotify.com' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Airbnb', domain: 'airbnb.com' },
  { name: 'Zoom', domain: 'zoom.us' },
  { name: 'Slack', domain: 'slack.com' },
  { name: 'LinkedIn', domain: 'linkedin.com' },
  { name: 'Twitter', domain: 'twitter.com' },
  { name: 'Shopify', domain: 'shopify.com' },
  { name: 'PayPal', domain: 'paypal.com' },
  { name: 'Stripe', domain: 'stripe.com' },
  { name: 'Cisco', domain: 'cisco.com' },
  { name: 'Dell', domain: 'dell.com' },
  { name: 'HP', domain: 'hp.com' },
  { name: 'Samsung', domain: 'samsung.com' },
  { name: 'Sony', domain: 'sony.com' },
  { name: 'Panasonic', domain: 'panasonic.com' },
  { name: 'LG', domain: 'lg.com' },
  { name: 'Tesla', domain: 'tesla.com' },
  { name: 'SpaceX', domain: 'spacex.com' },
  { name: 'GitHub', domain: 'github.com' },
  { name: 'GitLab', domain: 'gitlab.com' },
  { name: 'Atlassian', domain: 'atlassian.com' },
  { name: 'Asana', domain: 'asana.com' },
  { name: 'Trello', domain: 'trello.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Canva', domain: 'canva.com' },
  { name: 'Cloudflare', domain: 'cloudflare.com' },
  { name: 'DigitalOcean', domain: 'digitalocean.com' },
  { name: 'Heroku', domain: 'heroku.com' },
  { name: 'Twilio', domain: 'twilio.com' },
  { name: 'Mailchimp', domain: 'mailchimp.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Dropbox', domain: 'dropbox.com' },
  { name: 'Square', domain: 'squareup.com' },
  { name: 'Reddit', domain: 'reddit.com' },
  { name: 'Discord', domain: 'discord.com' },
  { name: 'TikTok', domain: 'tiktok.com' },
];

const ClientSection = () => {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="container-xxl py-5 bg-white">
      <div className="container px-lg-5">
        <div className="section-title position-relative text-center mb-5 pb-2 scroll-reveal from-bottom">
          <h6 className="position-relative d-inline text-primary ps-4">
            {isAr ? 'شركاء النجاح' : 'Success Partners'}
          </h6>
          <h2 className="mt-2">
            {isAr ? 'أكثر من 50 عميل يثقون في حلولنا التقنية' : 'More than 50 Clients Trust Our Technical Solutions'}
          </h2>
        </div>
        
        <div className="row g-4 align-items-center">
          {/* Lottie Animation */}
          <div className="col-lg-12 mb-5 scroll-reveal zoom-in">
            <DotLottieReact
              src="https://lottie.host/69c446f6-fb2b-4d1a-a205-ea530ab53a93/htZAphvAz9.lottie"
              loop
              autoplay
              style={{ width: '100%', maxWidth: '250px', margin: '0 auto' }}
            />
          </div>

          {/* Logos Grid */}
          <div className="col-lg-12">
            <div className="row g-3 align-items-center justify-content-center">
              {clientsData.map((client, index) => (
                <div className="col-4 col-md-3 col-lg-2 scroll-reveal zoom-in" data-delay={(index % 10) * 100} key={index}>
                  <div className="client-logo-item p-2 text-center transition">
                    <div className="bg-white p-3 rounded shadow-sm border border-light hover-shadow transition d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                       <img 
                         src={`https://logo.clearbit.com/${client.domain}`} 
                         alt={client.name} 
                         className="img-fluid grayscale hover-color" 
                         style={{ maxHeight: '50px', width: 'auto' }}
                         onError={(e) => {
                           e.target.onerror = null; 
                           e.target.src = `https://ui-avatars.com/api/?name=${client.name}&background=f8f9fa&color=2142B1&bold=true`;
                         }}
                       />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSection;
