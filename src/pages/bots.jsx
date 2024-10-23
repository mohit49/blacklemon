import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import DropDownSelect from "../uielement/DropDownSelect";
import InputType from "../uielement/InputType";
import Button from "../uielement/button";
import stratigy from "../assets/BlackLemon_Strategies.png"
import { DigoIcon ,SettingIcon , ViewIcon, PlayIcon} from "../icons/icons";
function Bots() {
  const options = [
    { value: "1", label: "Scalping" },
    { value: "2", label: "Moving averages" },
    { value: "3", label: "Day trading crypto" },
  ];

  return (
    <div className="bots">
      <h2 className="heading-top">
        Bots
       
      </h2>
      <p className="bot-breadcrumb">Create bot based on <span>“Tony’s Strategy”</span></p>
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-bar">
            <div className="head">
              <p>New Bot Configuration</p>
              
            </div>
          
          </div>
          <div className="bot-form">
            <InputType label="Name" type="text" icon="false" placeholder="Type the name for your bot"/>
          
              <p className="form-subhead">Exchange</p>

              <div className="feild-exchange">
            <InputType label="Binance" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 
            <InputType label="Kucoin" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 
            <InputType label="Bybit" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 

            </div>

            <p className="form-subhead">Trading Pair (select two)</p>

<div className="feild-exchange">
<InputType label="ETH" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 
<InputType label="XRP" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 
<InputType label="USDT" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 
<InputType label="BTC" type="checkbox" icon="false" placeholder="Type the name for your bot"/> 

</div>
<div className="bot-feild">
<InputType label="Trading Size" type="text" icon="false" placeholder="e.g.1.0"/>
<InputType label="Minimum Profitability" type="text" icon="false" placeholder="e.g.0.002"/>
<div className="advance-set"><SettingIcon/> <p>Advanced Options</p></div>
</div>

<div className="submit-con">
<Button buttonType="link" className="default-btn"><ViewIcon/>Paper Trade</Button>
<Button buttonType="link" className="default-btn"><PlayIcon/>Live Trade</Button>
</div>

          </div>
        </Card>
      </div>
    </div>
  );
}

export default Bots;
