import React from 'react';

const page = () => {
  return (
    <div>
      {/* Breakpoints */}
      <div className="p-2 tablet:p-4 desktop:p-8">Responsive Card</div>

      {/* Input capabilities */}
      <button className="p-2 touch:p-4 mouse:hover:bg-blue-500">Click Me</button>

      {/* Orientation */}
      <div className="portrait:bg-yellow-200 landscape:bg-green-200 h-screen">Rotate me</div>

      {/* Accessibility */}
      <div className="bg-white dark:bg-gray-900 reduced-motion:animate-none">
        A11y friendly block
      </div>

      {/* JS detection */}
      <div className="no-js:hidden js:block">JS Enabled Content</div>
    </div>
  );
};

export default page;
