import { useEffect, useState } from 'react';
import Card from "../components/Card/card";
import { listAccounts } from '../util/Apis';

function Credentials() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userData = await listAccounts();
        setAccounts(userData);
      } catch (error) {
        setError('Failed to load users');
      }
    };

    fetchAccounts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className="heading-top">Credentials</h2>
      <div className="conatiner-grid cards credentials">
        <Card heading="Bots" size="full">
          <div className="available-accounts">
            <ul>
              <li>{accounts}</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Credentials;
