import { Redirect, router } from 'expo-router';
import { observer } from 'mobx-react';
import { userStore } from '../store/UserStore';
import { mechanicStore } from '../store/MechanicStore';


const Home = observer(() => {
    const { loading: mechanicLoading, user: mechanicUser } = mechanicStore;
    const { loading: userLoading, user } = userStore;

    const finishInit = !mechanicLoading && !userLoading;
    // If user are logged in, navigate to home page
    // If mechanic are logged in, navigate to mechanic home page
    if (finishInit) {
        if (mechanicUser !== null || user !== null)
        {
            return user !== null
                ? <Redirect href={'/(tabs)/home'} />
                : <Redirect href={'/(mechanic)/home'} />
        } else {
            return <Redirect href={'/onboard'} />
        }

    }

    
})

export default Home;