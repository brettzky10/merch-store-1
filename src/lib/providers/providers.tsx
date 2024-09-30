'use client'
import { Provider } from "react-redux";
import { store } from '@/lib/redux/store'

function ReduxProviders({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
}

export default ReduxProviders;