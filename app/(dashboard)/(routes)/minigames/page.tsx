"use client";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Heading } from '@/components/heading';
import { CodeIcon, SettingsIcon, Swords } from 'lucide-react';
import { Empty } from '@/components/empty';

const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();
  
  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
        <Heading
          title="Minigames!"
          description="Lets have fun!"
          icon={Swords}
          bgColor="bg-red-700/10"
        />
        <Empty label="Nothing to see yet :(" />
      </div>
      <div>
        {/* Move the script inclusion to the head of your HTML document */}
        {/* Start of Tawk.to Script */}
        <script type="text/javascript">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65898e8a70c9f2407f833972/1higl9jv8';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </script>
        {/* End of Tawk.to Script */}
      </div>
    </div>
  );
};

export default Sidebar;
