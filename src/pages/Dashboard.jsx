import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import { Info, Eth, Tether, Sui, Aptus } from "../icons/icons";
import Button from "../uielement/Button";
import CandleChart from "../components/CandleChart/CandleChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TradingView from "../components/TradingView/TradingView";
import { useSelector } from "react-redux";
import { getCookie } from "../util/cookieUtils";

function Dashboard() {

  const value = useSelector((state) => state.swap.value);

  console.log('---------');
  console.log('dashboard', value);
  console.log('---------');
  
  const InfoIco = Info;
  const EthIco = Eth;
  const TetherIco = Tether;
  const SuiIco = Sui;
  const AptusIco = Aptus;
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [botAccount, setBotAccount] = useState(null)
  const [state, setState] = useState(true)
  const [getBotInfo, setGetBotInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  const moveTo = () => {
    navigate('/strategies')
  }

  const getAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5500/api/bot-get')
      setGetBotInfo(response.data || [])
      const bot = response?.data || []
      const formData = bot?.map((item) => ((!item.status) ? {
        value: item._id,
        label: item.botName
      } : {}))

      setBotAccount(formData)
    } catch (error) {
      console.error('Error fetching bot data:', error);
      setGetBotInfo([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAccount()
  }, [state])

  useEffect(() => {
    // First check TNC acceptance
    const tncAccepted = getCookie('tncAccepted') === 'true';
    if (!tncAccepted) {
      navigate('/tnc');
      return;
    }

    // Then check authentication
    const params = new URLSearchParams(window.location.search);
    if (params.get('token')) {
      setToken(params.get('token'));
      localStorage.setItem('token', params.get('token'));
      window.history.replaceState(null, '', window.location.pathname);
      window.location.href = '/dashboard';
    } else if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else {
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <div className="w-full">
      <h2 className="heading-top">Dashboard</h2>
      <div className="h-[500px] w-full" style={{ minHeight: '500px' }}>
        <TradingView />
      </div>
      <div className="cards mt-10">
        <Card heading="Bots" className='relative'>

          <div className="list-data-bot">
            {
              loading ? (
                <div className="text-white">Loading...</div>
              ) : !getBotInfo || getBotInfo.length === 0 ? (
                <Notes
                  className="bot-dash"
                  icon={<InfoIco />}
                  discription="No bots are currently running. Try one of our examples or check out strategies from the community to start creating a bot."
                />
              ) : (
                getBotInfo.map((item, key) => (
                  <div key={key} className="text-white flex items-center gap-1" style={{ color: '#20E29F' }}>
                    <span>+</span>
                    <p>{item?.botName}</p>
                  </div>
                ))
              )
            }


          </div>
          <Button handler={moveTo} className="default-btn" >Explore More Stratiges</Button>
        </Card>
        <Card heading="Your Portfolio" otherInfo="$12544.44">
          <div className="tokens-status">
            <div className="token">
              <span><div className="icon-blu"><EthIco /></div><p>Etheroum(ETH)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>
            <div className="token">
              <span><div className="icon-blu green"><TetherIco /></div><p>Tether (USDT)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>
            <div className="token">
              <span><div className="icon-blu blue-lit"><SuiIco /></div><p>SUI(SUI)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>
            <div className="token">
              <span><div className="icon-blu white-bg"><AptusIco /></div><p>Aptos(APT)</p></span>
              <p className="amount">32.657 ETH</p>
              <p>$84116.60</p>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
