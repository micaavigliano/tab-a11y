import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IItems {
  name: string;
  id: number;
  content: string | ReactNode;
}

interface ITablist {
  items: IItems[];
}

interface ITab {
  id: number;
  name: string;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

interface ITabPanel {
  content: string | ReactNode;
  id: number;
  active: number;
  name: string;
}

const Tab: React.FC<ITab> = ({ name, id, setActive, active }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (id === active && btnRef.current) {
      btnRef.current.focus();
    }
  }, [id, active]);

  return (
    <button
      ref={btnRef}
      role="tab"
      type="button"
      id={`tab-${id}`}
      aria-controls={`tabpanel-${id}`}
      className={`${
        id === active ? "bg-pink-200" : "bg-transparent"
      } py-2 px-4`}
      onClick={() => setActive(id)}
      aria-selected={id === active ? true : false}
    >
      {name}
    </button>
  );
};

const TabPanel: React.FC<ITabPanel> = ({ content, id, active, name }) => {
  return (
    <>
      {id === active && (
        <div
          role="tabpanel"
          className={`w-9/12 border-solid border-2 border-black h-40 text-left p-2 overflow-auto`}
          id={`tabpanel-${id}`}
          aria-labelledby={`tab-${id}`}
          tabIndex={0}
        >
          <h3>{name}</h3>
          {content}
        </div>
      )}
    </>
  );
};

const TabList: React.FC<ITablist> = ({ items }) => {
  const [active, setActive] = useState<number>(
    items.length > 0 ? items[0].id : 0
  );
  const tabRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const focusedElement = document.activeElement as HTMLElement;

      const isButtonFocused = focusedElement?.getAttribute("role") === "tab";
      const isInsideTabPanel = focusedElement?.closest('[role="tabpanel"]');

      if (tabRef.current && isButtonFocused && !isInsideTabPanel) {
        if (event.key === "ArrowRight") {
          setActive((prevIndex) =>
            prevIndex < items.length ? prevIndex + 1 : 1
          );
        } else if (event.key === "ArrowLeft") {
          setActive((prevIndex) =>
            prevIndex > 1 ? prevIndex - 1 : items.length
          );
        } else if (event.key === "Home") {
          setActive(1);
        } else if (event.key === "End") {
          setActive(items.length);
        }
      }
    },
    [items.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length, active, handleKeyDown]);

  return (
    <>
      <h1 id="tablist-1" className="pb-12">
        Tabs accesibles
      </h1>
      <div
        role="tablist"
        aria-labelledby="tablist-1"
        className="flex flex-row divide-x divide-solid divide-pink-300"
        ref={tabRef}
      >
        {items.map((item) => (
          <Tab
            id={item.id}
            name={item.name}
            active={active}
            setActive={setActive}
            key={item.id}
          />
        ))}
      </div>
      {items.map((item) => (
        <TabPanel
          content={item.content}
          id={item.id}
          active={active}
          name={item.name}
          key={item.id}
        />
      ))}
    </>
  );
};

export default TabList;
