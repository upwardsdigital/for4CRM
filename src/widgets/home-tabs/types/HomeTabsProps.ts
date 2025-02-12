import { HomeTabT } from './HomeTabT'

export interface HomeTabsProps {
    activeValue?: string
    tabs: HomeTabT[]
    className?: string
    onTabChange?: (tab: HomeTabT) => void
}
