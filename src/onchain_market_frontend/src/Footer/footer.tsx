import Container from "@/Components/Container";
import logo from "@/images/logo.svg";
import { CiInstagram, CiFacebook, CiTwitter } from "react-icons/ci";
import { AiOutlineDiscord } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-[#11122D] min-h-screen pt-4">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-between gap-10 space-y-6 pb-3">
          <div className="flex flex-col space-y-4">
            <div className="h-[65px] w-[240px]">
              <img src={logo} alt="Logo" />
            </div>
            <div className="flex space-x-2 text-lg">
              <CiFacebook size={26} />
              <CiInstagram size={26} />
              <CiTwitter size={26} />
              <AiOutlineDiscord size={26} />
            </div>
            <div>
              <p>support@chainmarket.com</p>
            </div>
          </div>
          <div className="">
            <h4 className="pb-6 font-semibold text-xl">Markets</h4>
            <div className="space-y-2 font-mono text-sm opacity-50">
              <p>All</p>
              <p>New</p>
              <p>Politics</p>
              <p>Sports</p>
              <p>Pop culture</p>
              <p>Science</p>
              <p>Business</p>
            </div>
          </div>
          <div>
            <h4 className="pb-6 font-semibold text-xl">Resources</h4>
            <div className="space-y-2 font-mono text-sm opacity-50">
              <p>Community</p>
              <p>Developers</p>
              <p>Contact</p>
              <p>Learn more...</p>
            </div>
          </div>
          <div>
            <h4 className="pb-6 font-semibold text-xl">Terms of service</h4>
            <p className="font-mono text-sm opacity-50">
              All information provided on this site is intended solely for
              educational purposes related to trading on financial markets and
              does not serve in any way as a specific investment recommendation,
              business recommendation, investment opportunity analysis or
              similar general recommendation regarding the trading of investment
              instruments. FTMO only provides services of simulated trading and
              educational tools for traders. The information on this site is not
              directed at residents in any country or jurisdiction where such
              distribution or use would be contrary to local laws or
              regulations. FTMO companies do not act as a broker and do not
              accept any deposits. The offered technical solution for the FTMO
              platforms and data feed is powered by liquidity providers.
            </p>
          </div>
          <div>
            <h4 className="pb-6 font-semibold text-xl">Privacy policy</h4>
            <p className="font-mono text-sm opacity-50">
              All information provided on this site is intended solely for
              educational purposes related to trading on financial markets and
              does not serve in any way as a specific investment recommendation,
              business recommendation, investment opportunity analysis or
              similar general recommendation regarding the trading of investment
              instruments.
            </p>
          </div>
        </div>
      </Container>
      <p className="text-center pt-4 pb-4  border-t-2 text-white">
        ChainMarket-Copyright © 2024
      </p>
    </div>
  );
};

export default Footer;

//#1A192C #080814
//#1E1D30 #0C0B19

//#030308
//background:linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)"
