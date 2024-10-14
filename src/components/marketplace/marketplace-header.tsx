// Header.tsx
import AccountSettingsDialog from '../account-settings-dialog'
import HelpDialog from '../help-dialog';

interface HeaderProps {
  title: string;
}

const MarketplaceHeader: React.FC<HeaderProps> = ({ title }) => (
    <>
        <h1 className="text-xl font-bold mb-4 text-center text-gray-800">
        {title}
    </h1>
    <AccountSettingsDialog />
    <HelpDialog />
  </>
);

export default MarketplaceHeader;