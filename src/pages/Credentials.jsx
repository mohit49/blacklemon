import { useEffect, useState } from 'react';
import Card from "../components/Card/card";
import { listAccounts, getCredentials, addAccount, delAccount, getConnector, connectKey } from '../util/Apis';
import InputType from "../uielement/InputType";
import DropDownSelect from "../uielement/DropDownSelect";
import Button from '../uielement/Button';
import Popmsg from '../uielement/Popmsg';

function Credentials() {
  const [accounts, setAccounts] = useState(null);
  const [data, setUserData] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [error, setError] = useState(null);
  const [popmsg, setPopmsg] = useState(null);
  const [account, setAccountAdd] = useState(null);
  const [delAcc, setDelAcc] = useState(null);
  const [loadingState, setLoadingState] = useState(null); // Track button loading state
  const [selCon, setSelConnectors] = useState();
  const [apiData, setApiCred] = useState({});
  function addAccnoutInput(val) {
    setAccounts(val.target.value);
  }
  function setApi(data) {
    const input = data.target.parentElement.innerText,  // The dynamic key (e.g., 'revDate')
      value = data.target.value;  // The value of that key (e.g., the value inputted)

    // Remove any object with the same key and value from prevData
    setApiCred(prevData => {
      const { [input]: removed, ...rest } = prevData; // Destructure to remove the existing key

      // Add the new key-value pair, preserving the other keys
      return { ...rest, [input]: value };
    });
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listAccounts();
        setUserData([]);
        setSelectData([]); // Reset select data before setting new data
        userData.forEach(element => {
          setSelectData(prevData => [...prevData, { value: element, label: element }]);
        });

        // Use a for-loop to handle async operations properly
        for (const ele of userData) {
          try {
            const acc = await getCredentials(ele);
            setUserData(prevData => [...prevData, { ele, acc }]);
          } catch (error) {
            setError('Failed to load user credentials');
          }
        }

      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, [account]);

  useEffect(() => {
    const fetchConnectors = async () => {
      const connectors = await getConnector(accounts);
      setConnectors(prevData => [
        ...prevData,
        ...connectors.map(element => ({
          value: element,
          label: element,
        }))
      ]);
    }

    fetchConnectors();
  }, []); // Empty dependency array to fetch once when the component mounts


  function addAccountMn() {
    const addAccounts = async () => {
      setLoadingState('add'); // Set loading state to 'add' button

      try {
        const addedAcc = await addAccount(accounts);
        console.log(addedAcc);
        setError(false);
        setPopmsg(addedAcc.message);
        setAccountAdd(true);
      } catch (error) {
        setError(true);
        setPopmsg(error?.response?.data?.detail);
      } finally {
        setLoadingState(null); // Reset loading state
      }
    };

    addAccounts();
  }

  function selectedValue(data) {
    setDelAcc(data.value);
  }
  function selectedValueConnectors(data) {
    setSelConnectors(data.value);
  }

  function deleteAccountMn() {
    const deleteAccounts = async () => {
      setLoadingState('delete'); // Set loading state to 'delete' button

      try {
        const deleteAcc = await delAccount(delAcc);
        console.log(deleteAcc);
        setError(false);
        setPopmsg(deleteAcc.message);
        setAccountAdd(true);

        // Refresh the dropdown options after deletion
        await fetchUpdatedAccounts(); // Refetch the accounts after deletion

      } catch (error) {
        setError(true);
        setPopmsg(error?.response?.data?.detail);
      } finally {
        setLoadingState(null); // Reset loading state
      }
    };

    deleteAccounts();
  }

  // Function to fetch updated accounts and refresh the dropdown
  const fetchUpdatedAccounts = async () => {
    try {
      const userData = await listAccounts();
      setSelectData([]); // Reset selectData before updating with new list
      userData.forEach(element => {
        setSelectData(prevData => [...prevData, { value: element, label: element }]);
      });
    } catch (error) {
      setError('Failed to refresh account list');
    }
  };

  function addCredentials() {
    const addconnector = async () => {
      setLoadingState('connectKy'); // Set loading state to 'delete' button

      try {
        const connector = await connectKey(apiData, selCon, delAcc);
        console.log(connector)
        setLoadingState(null);
        setError(false);
        setPopmsg(connector.message);
        setAccountAdd(true);
      } catch (error) {
        setError(true);
        setPopmsg(error?.response?.data?.detail);
      } finally {
        setLoadingState(null); // Reset loading state
      }
    };

    addconnector();
  }

  return (
    <div>
      <h2 className="heading-top">Credentials</h2>
      <div className="container-grid cards credentials">
        <Card heading="Available Accounts and Credentials" size="full">
          <div className="available-accounts">
            <ul>
              {data?.map((item, index) => (
                <li key={index}>
                  <div>🏦 {item.ele}</div>
                  {item.acc && <ul>{item.acc.map(eleItem =>
                    <li key={eleItem}>{eleItem}</li>
                  )} </ul>}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card heading="Add Account" size="full">
          <div className="available-accounts">
            <InputType onInputChange={addAccnoutInput} label="New Account Name" type="text" icon="false" placeholder="Type the name for your bot" />
            <Button
              disabled={!accounts?.length}
              buttonType="button"
              handler={addAccountMn}
              className="default-btn"
            >
              {loadingState === 'add' ? "Please Wait" : "Add Account"}
            </Button>
          </div>
        </Card>

        <Card heading="Delete Account" size="full">
          <div className="available-accounts">
            {selectData.length > 0 ? <DropDownSelect setSelectedVal={selectedValue} options={selectData} /> : "No account to delete"}
            <Button
              buttonType="button"
              handler={deleteAccountMn}
              className="default-btn"
            >
              {loadingState === 'delete' ? "Please Wait" : "Delete Account"}
            </Button>
          </div>
        </Card>
        <Card heading="Add Credentials" size="full">
          <div className="available-accounts add-cred-method">

            <div className='add-credentials'>
              <h3>Select Account</h3>
              {selectData.length > 0 ? <DropDownSelect setSelectedVal={selectedValue} options={selectData} /> : "No account to delete"}

            </div>
            <div className='add-credentials'>
              <h3>Select Connectors</h3>
              {selectData.length > 0 ? <DropDownSelect setSelectedVal={selectedValueConnectors} options={connectors} /> : "No account to delete"}

            </div>


          </div>
          <div className="available-accounts add-cred-method add-cred-bot">
            {delAcc && <p>Provide Configuration Map for <b>{selCon}</b></p>}

            {selCon && <div className="bot-feild">
              <InputType onInputChange={setApi} label={`${selCon}_api_key`} type="text" icon="false" placeholder="Api Key" />
              <InputType onInputChange={setApi} label={`${selCon}_api_secret`} type="text" icon="false" placeholder="Api Secret" />

            </div>}
            <br />
            {Object.keys(apiData).length > 1 && <Button
              buttonType="button"
              handler={addCredentials}
              className="default-btn"
            >
              {loadingState === 'connectKy' ? "Please Wait" : "Add Credentials"}
            </Button>}
          </div>
        </Card>
        {popmsg && <Popmsg className={error ? "error" : ""}>{popmsg}</Popmsg>}
      </div>
    </div>
  );
}

export default Credentials;
