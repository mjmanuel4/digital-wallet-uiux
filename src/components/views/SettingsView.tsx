import { useState} from 'react';
import { Bell, Globe, Shield, SunMoon} from 'lucide-react';

interface Settings {
  notifications: {
    email: boolean,
    push: boolean,
    sms: boolean
  },
  language: string,
  twoFactor: boolean,
  dark: boolean
}

type NotificationType = 'email' | 'push' | 'sms';

function SettingsView() {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    language: 'en',
    twoFactor: false,
    dark: (localStorage.getItem('theme') === 'dark') ? true : false
  });

  const handleNotificationChange = (typeString: string) => {
    const type: NotificationType = typeString as NotificationType;
    setSettings((prevSettings) => ({
      ...prevSettings,
      notifications: {
        ...prevSettings.notifications,
        [type]: !prevSettings.notifications[type],
      },
    }));
  };

  const handleLanguageChange = (e: any) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      language: e.target.value,
    }));
  };

  const handleTwoFactorChange = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      twoFactor: !prevSettings.twoFactor,
    }));
  };

  const handleThemeChange = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      dark: !prevSettings.dark,
    }))
    updateTheme();
  }

  const updateTheme = () => {
    if (!settings.dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('Theme:', localStorage.getItem('theme'));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('Theme:', localStorage.getItem('theme'));
    }
  }

  return (
    <div className="space-y-6 px-6 sm:px-0">

      {/* Notification Settings */}
      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
            <Bell className="mr-2" size={20} /> Notification Settings
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-700 px-2 py-0">
          <dl className="divide-y divide-gray-200 dark:divide-slate-700">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="py-5 grid grid-cols-2 gap-4 px-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-zinc-300 capitalize">{key} Notifications</dt>
                <dd className="my-auto text-sm text-gray-900">
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`${
                      value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    <span
                      className={`${
                        value ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Language Settings */}
      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
            <Globe className="mr-2" size={20} /> Language Settings
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-700 px-2 py-0">
          <div className="py-5 grid grid-cols-2 gap-4 px-4 sm:px-6">
            <dt className="py-2 text-sm font-medium text-gray-500 dark:text-zinc-300">Language</dt>
            <dd className="my-auto text-sm text-gray-900">
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 dark:bg-slate-800 dark:shadow-lg dark:text-zinc-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </dd>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
            <Shield className="mr-2" size={20} /> Security Settings
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-700 px-2 py-5 sm:p-0">
          <div className="py-0 sm:py-5 grid grid-cols-2 gap-4 px-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-zinc-300">Two-Factor Authentication</dt>
            <dd className="my-auto text-sm text-gray-900 sm:mt-0">
              <button
                onClick={handleTwoFactorChange}
                className={`${
                  settings.twoFactor ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <span
                  className={`${
                    settings.twoFactor ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
              </button>
            </dd>
          </div>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <div className="px-6 py-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white flex items-center">
            <SunMoon className="mr-2" size={20} /> Theme
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-slate-700 px-2 py-5 sm:p-0">
          <div className="py-0 sm:py-5 grid grid-cols-2 gap-4 px-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-zinc-300">Dark Mode</dt>
            <dd className="my-auto text-sm text-gray-900 dark:text-slate-400 sm:mt-0">
              <button
                onClick={handleThemeChange}
                className={`${
                  settings.dark ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <span
                  className={`${
                    settings.dark ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                >
                </span>
              </button>
            </dd>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="mt-6">
        <button
          onClick={() => alert('Settings saved!')}
          className="w-full flex justify-center py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsView;