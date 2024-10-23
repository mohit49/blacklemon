import Card from "../components/Card/card";
import Notes from "../components/Notes/Notes";
import DropDownSelect from "../uielement/DropDownSelect";
import InputType from "../uielement/InputType";
import Button from "../uielement/button";
import stratigy from "../assets/BlackLemon_Strategies.png"
import { DigoIcon } from "../icons/icons";
function Strategies() {
  const options = [
    { value: "1", label: "Scalping" },
    { value: "2", label: "Moving averages" },
    { value: "3", label: "Day trading crypto" },
  ];

  return (
    <div className="stratiges">
      <h2 className="heading-top">
        Strategies{" "}
        <span>
          {<DropDownSelect options={options} />}{" "}
          <InputType type="text" placeholder="Search" />
        </span>
      </h2>
      <div className="conatiner-grid cards card-full">
        <Card heading="" size="full">
          <div className="table-bar">
            <div className="head">
              <p>Strategy</p>
              <p>Details</p>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            <div className="table-tr head-tr">
              <div className="table-tr">
                <div className="table-td">
                  <div className="badge">12</div> <div className="badge2"><img src={stratigy}/></div>
                </div>
                <div className="table-td">
                  <div className="details">
                    <p>Tony’s Strategy</p>
                    <p>Cloned from Cross Exchange Market Strategy</p>
                  </div>
                </div>
              </div>
              <div className="table-tr last-head">
                <div className="table-td">
                  {" "}
                  <div className="details">
                    <p>16 Hrs Ago</p>
                    <p>by 09xhti....be35</p>
                  </div>
                </div>
                <div className="table-td"><p className="discord">discord <DigoIcon/></p></div>
              </div>
            </div>
            
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Strategies;
