import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function Header() {
  return (
    <div className="bg-[#1E3A8A] p-3 rounded-lg fixed left-1/2 transform -translate-x-1/2 top-5 flex flex-row w-[40vw]">
        <img src="/4.jpg" className="w-[10%] rounded object-cover object-center mr-20"/>
      <NavigationMenu className="flex justify-center">
        <NavigationMenuList className="flex flex-row gap-10">
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">About</NavigationMenuItem>
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">Case Studies</NavigationMenuItem>
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">Services</NavigationMenuItem>
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">Contact Us</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Header;
