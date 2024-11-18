import { Link, NavLink, useResolvedPath } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import type { IMenu } from "@/models/interface";
import { IconChevronDown } from "../icons";
import useCheckActiveNav from "@/hooks/use-check-active-nav";
import { Fragment } from "react/jsx-runtime";

export interface SideLink extends Partial<IMenu> {
  sub?: Partial<IMenu>[];
}

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: Partial<IMenu>[];
  closeNav: () => void;
}

export function AppNav({ links, isCollapsed, className, closeNav }: NavProps) {
  const renderLink = ({ children, ...rest }: Partial<IMenu>) => {
    const key = `${rest.title}-${rest.path}`;
    if (isCollapsed && children)
      return (
        <NavLinkIconDropdown
          {...rest}
          children={children}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (children)
      return (
        <NavLinkDropdown
          {...rest}
          children={children}
          key={key}
          closeNav={closeNav}
        />
      );
    if (!rest.title) return <Fragment key={key}></Fragment>;
    return <NavLinkComp {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

interface NavLinkProps extends Partial<IMenu> {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLinkComp({
  title,
  icon,
  path = "",
  closeNav,
  subLink = false,
  children,
  ...rest
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  if (children)
    return (
      <NavLinkDropdown
        {...rest}
        children={children}
        closeNav={closeNav}
        title={title}
      />
    );
  return (
    <NavLink
      to={path}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(path) ? "secondary" : "ghost",
          size: "sm",
        }),
        "h-12 justify-start text-wrap rounded-none px-6",
        subLink && "h-10 w-full border-l border-l-slate-500 px-2"
      )}
      aria-current={checkActiveNav(path) ? "page" : undefined}
    >
      <div className="mr-2">{icon}</div>
      {title}
      {/* {label && <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>{label}</div>} */}
    </NavLink>
  );
}

function NavLinkDropdown({ title, icon, children, closeNav }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!children?.find((s) => checkActiveNav(s.path || ""));

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "group h-12 w-full justify-start rounded-none px-6"
        )}
      >
        <div className="mr-2">{icon}</div>
        {title}
        {/* {label && <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>{label}</div>} */}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <IconChevronDown />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {children?.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLinkComp {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavLinkIcon({ title, icon, path = "" }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <NavLink
          to={path}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(path) ? "secondary" : "ghost",
              size: "icon",
            }),
            "h-12 w-12"
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {/* {label && <span className='ml-auto text-muted-foreground'>{label}</span>} */}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, children }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();

  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!children?.find((s) => checkActiveNav(s.path || ""));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? "secondary" : "ghost"}
              size="icon"
              className="h-12 w-12"
            >
              {icon}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-4">
          {title}
          {/* {label && <span className='ml-auto text-muted-foreground'>{label}</span>} */}
          <IconChevronDown className="-rotate-90 text-muted-foreground" />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" sideOffset={4}>
        <DropdownMenuLabel>
          {title}
          {/* {label ? `(${label})` : ''} */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {sub!.map(({ title, icon, label, href }) => (
                    <DropdownMenuItem key={`${title}-${href}`} asChild>
                        <Link to={href} className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}>
                            {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
                            {label && <span className='ml-auto text-xs'>{label}</span>}
                        </Link>
                    </DropdownMenuItem>
                ))} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
