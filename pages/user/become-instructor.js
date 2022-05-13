import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = ()=>{

    setLoading(true)
    axios.post('/api/make-instructor')
    .then((res)=>{
        console.log(res)
        window.location.href = res.data
    }).catch((err)=>{
        console.log(err)
        toast('Paystack onboarding failed, try again')
        setLoading(false)
    })
    

}

  return (
    <>
      <h1 className="jumbotron text-center square">Become Instructor</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="pt-4">
              <UserSwitchOutlined className="display-1 pb-3" />
              <br />
              <h2>Setup payout to publish courses on Ndemy</h2>
              <p>
                Ndemy partners with Paystack to transfer earnings to your bank
                account
              </p>
              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                icon={loading ? <LoadingOutlined/> : <SettingOutlined/>}
                onClick={becomeInstructor}
                disabled
                // disabled={(user && user.role && user.role.includes('instructor') || loading)}
              >
                  {loading ? 'Processing...' : 'Payout Setup'}
              </Button>
              <p className="lead">
                You will be redirected to Paystack to complete onboarding
                process
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
