import { AppRouter } from './router'
import { Layout } from '@/widgets/layout'
import './styles/globals.sass'
import './styles/variables.sass'

export const App = () => {
    return (
        <Layout>
            <AppRouter />
        </Layout>
    )
}
