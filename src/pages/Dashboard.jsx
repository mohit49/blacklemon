import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import { Info, Eth, Tether, Sui ,Aptus } from "../icons/icons";
import Button from "../uielement/button";
import CandleChart from "../components/CandleChart/CandleChart";
function Dashboard() {
  const InfoIco = Info;
  const EthIco = Eth;
  const TetherIco = Tether;
  const SuiIco = Sui;
  const AptusIco = Aptus;

  return (
    <div>
      <h2 className="heading-top">Dashboard</h2>
      <div className="conatiner-grid cards">
        <Card heading="Bots">
          <Notes
            className="bot-dash"
            icon={<InfoIco />}
            discription="No bots are currently running. Try one of our examples or check out strategies from the community to start creating a bot."
          />
          <ul className="list-data-bot">
            <li>
              <span>+</span>
              <p>Cross Exchange Market Strategy</p>
            </li>
            <li>
            <span>+</span>
              <p>Basic Arbitrage</p>
            </li>
            <li>
            <span>+</span>
              <p>Triangular Arbitrage</p>
            </li>
            <li>
            <span>+</span>
              <p>Basic Market Making</p>
            </li>
          </ul>
          <Button buttonType="link" className="default-btn">Explore More Stratiges</Button>
        </Card>
        <Card heading="Monthly (P&L)" >
        <CandleChart />
            </Card>
        <Card heading="Balances">
            <div className="table-bar">
            <div className="head">
                <p>Token</p>
                <p>Doller Value</p>
            </div>
            <div className="head heading">
                <p>Local Wallet</p>
               
            </div>
            <div className="head data">
                <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
                </div>
                <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
                </div>
                <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
                </div>
            </div>
            <div className="head heading">
                <p>BINANCE</p>
               
            </div>
            <div className="head data">
                <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
                </div>
                <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
                </div>
                <div>
                <p>232.65 ETH</p>
                <p>$81466.16</p>
                </div>
            </div>
            </div>
        </Card>
        <Card heading="Your Portfolio" otherInfo="$12544.44">
            <div className="tokens-status">
                <div className="token">
                    <span><div className="icon-blu"><EthIco/></div><p>Etheroum(ETH)</p></span>
                    <p className="amount">32.657 ETH</p>
                    <p>$84116.60</p>
                </div>
                <div className="token">
                    <span><div className="icon-blu green"><TetherIco/></div><p>Tether (USDT)</p></span>
                    <p className="amount">32.657 ETH</p>
                    <p>$84116.60</p>
                </div>
                <div className="token">
                    <span><div className="icon-blu blue-lit"><SuiIco/></div><p>SUI(SUI)</p></span>
                    <p className="amount">32.657 ETH</p>
                    <p>$84116.60</p>
                </div>
                <div className="token">
                    <span><div className="icon-blu white-bg"><AptusIco/></div><p>Aptus(APT)</p></span>
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
