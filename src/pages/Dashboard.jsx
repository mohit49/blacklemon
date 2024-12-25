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
  const [getBotInfo, setGetBotInfo] = useState('')

  const moveTo = () => {
    navigate('/strategies')
  }

  const getAccount = async () => {
    const response = await axios.get('http://localhost:5000/api/bot-get')
    setGetBotInfo(response.data)
    const bot = response?.data || []
    const formData = bot?.map((item) => ((!item.status) ? {
      value: item._id,
      label: item.botName
    } : {}))

    setBotAccount(formData)
  }

  useEffect(() => {
    getAccount()
  }, [state])

  useEffect(() => {
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
  let totalPrice = 0
  totalPrice += value?.map((item) => {
    item?.balance * item?.price
  })

  console.log('tota', totalPrice);
  
  return (
    <div className="h-screen w-full">
      <h2 className="heading-top">Dashboard</h2>
      <div className="h-[500px] w-full">
        <TradingView />
      </div>
      <div className="conatiner-grid cards mt-10">
        <Card heading="Bots" className='relative'>

          <div className="list-data-bot">
            {
              !getBotInfo ?
                <Notes
                  className="bot-dash"
                  icon={<InfoIco />}
                  discription="No bots are currently running. Try one of our examples or check out strategies from the community to start creating a bot."
                />
                : getBotInfo.map((item, key) => (
                  <div index={key} className="text-white flex items-center gap-1 text-yellow-300">
                    <span>+</span>
                    <p>{item?.botName}</p>
                  </div>
                ))
            }


          </div>
          <Button handler={moveTo} className="default-btn" >Explore More Stratiges</Button>
        </Card>
        <Card heading="Your Portfolio" otherInfo={`${totalPrice} $`}>
          <div className="tokens-status">
            <table className="text-white">
              <thead className="text-lg  text-yellow-300">
                <td>No</td>
                <td>Name</td>
                <td>Symbol</td>
                <td>Balance</td>
                <td>Price</td>
                <td>Total</td>
              </thead>
              <tbody className="text-md">
                {
                  value?.map((item, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.symbol}</td>
                      <td>{item?.balance}</td>
                      <td>{item?.price} $</td>
                      <td>{item?.price * item?.balance} $</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
