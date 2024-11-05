import { useEffect, useState } from 'react';
import Card from "../components/Card/card";
import { listAccounts, getCredentials } from '../util/Apis';
import InputType from "../uielement/InputType";
import DropDownSelect from "../uielement/DropDownSelect";
function Credentials() {
  const [accounts, setAccounts] = useState(null);
  const [data, setUserData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listAccounts();
        
        userData.forEach(element => {
          setSelectData(prevData => [...prevData, { value:element, label : element }]); // Create a new array with the previous data and the new item
        });
        // Using a for-loop instead of forEach to handle async operations properly
        for (const ele of userData) {
          try {
            const acc = await getCredentials(ele);
            setUserData(prevData => [...prevData, { ele, acc }]); // Create a new array with the previous data and the new item
          } catch (error) {
            setError('Failed to load user credentials');
          }
        }

      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, []);

  
  return (
    <div>
      <h2 className="heading-top">Credentials</h2>
      <div className="container-grid cards credentials">
        <Card heading="Available Accounts and Credentials" size="full">
          <div className="available-accounts">
            <ul>
              {/* Render data properly as list items */}
              {data?.map((item, index) => (
                <li key={index}>
                  {/* Render the account info here */}
                  <div>🏦 {item.ele}</div>
                  {item.acc && <ul>{item.acc.map(eleItem =>
                    <li>{eleItem}</li>
                  )} </ul>}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card heading="Add Account" size="full">
          <div className="available-accounts">
          <InputType label="New Account Name" type="text" icon="false" placeholder="Type the name for your bot"/>
        
          </div>
        </Card>

        <Card heading="Delete Account" size="full">{selectData.length > 0 ? <DropDownSelect options={selectData} /> : "No account to delete"
}</Card>
      </div>
    </div>
  );
}

export default Credentials;
