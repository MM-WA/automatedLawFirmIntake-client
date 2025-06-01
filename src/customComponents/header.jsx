import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

function Header() {
  return (
    <div className="bg-[#1E3A8A] p-3 rounded-lg fixed left-1/2 transform -translate-x-1/2 top-5 flex flex-row xl:w-[40vw]">
      <p className="mr-20 mt-2 font-bold bg-white rounded p-3 text-xl">LegalAI</p>
      <NavigationMenu className="flex justify-center">
        <NavigationMenuList className="flex flex-row xl:gap-10">
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">
            <NavigationMenuLink>About</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">
            <NavigationMenuLink>Case Studies</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">
            <NavigationMenuLink>Services</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-lg text-white font-[400] hover:cursor-pointer">
            <NavigationMenuLink>Contact Us</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Header;
