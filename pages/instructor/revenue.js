import { DollarOutlined, SettingOutlined, SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Context } from "../../context";
import { stripeCurrencyFormatter } from "../../utils/helpers";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
      const {data} = await axios.get('/api/instructor/balance')
      console.log(data)
      setBalance(data)
  };
  const handlePayoutSettings = async () => {
      try {
        setLoading(true)
        const {data} = await axios.get('/api/instructor/payout-settings')
        window.location.href = data         
      } catch (err) {
          setLoading(false)
          console.log(err)
          toast('Unable to access payout settings. Try again later.')
      }
  };

  return <InstructorRoute>
      <div className="container">
          <div className="row pt-2">
              <div className="col-md-8 offset-md-2 bg-light p-5">
                  <h2>
                      Revenue report <DollarOutlined className="float-right"/>{' '}
                  </h2>
                  <small>You get paid directly from stripe to your bank account every 48 hours</small>
                  <hr/>
                  <h4>
                      Pending balance <span className="float-right">
                          {balance.pending && balance.pending.map((bp, i)=>(
                              <span key={i} className='float-right'>
                                  {stripeCurrencyFormatter(bp)}
                              </span>
                          ))}
                      </span>
                  </h4>
                      <small>For 48 hours</small>
                      <hr />
                      <h4>
                          Payouts {' '}
                          {!loading ?(
                              <SettingOutlined className="float-right pointer"
                              onClick={handlePayoutSettings}
                              />
                          ):(
                              <SyncOutlined  spin className="float-right pointer"/>
                          ) }
                      </h4>
                      <small>
                          Update your stripe account details or view previous Payouts
                      </small>
              </div>
          </div>
      </div>
  </InstructorRoute>;
};

export default InstructorRevenue;
