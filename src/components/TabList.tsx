import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IItems {
  name: string;
  id: number;
  content: string;
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
  content: string;
  id: number;
  active: number;
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
      tabIndex={id === active ? 0 : -1}
      className={`${
        id === active ? "bg-pink-200" : "bg-transparent"
      } py-2 px-4 divide-y divide-gray-400`}
      onClick={() => setActive(id)}
      aria-selected={id === active ? true : false}
    >
      {name}
    </button>
  );
};

const TabPanel: React.FC<ITabPanel> = ({ content, id, active }) => {
  return (
    <>
      {id === active ? (
        <section
          role="tabpanel"
          className={`bg-pink-300 w-9/12 border-solid border-2 border-black h-40 text-left p-2`}
          aria-controls={`tab-${id}`}
        >
          {content}
        </section>
      ) : (
        <></>
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
      if (event.key === "ArrowRight") {
        setActive((prevIndex) =>
          prevIndex < items.length ? prevIndex + 1 : 1
        );
      } else if (event.key === "ArrowLeft") {
        setActive((prevIndex) =>
          prevIndex > 1 ? prevIndex - 1 : items.length
        );
      }
    },
    [items.length]
  );

  useEffect(() => {
    if (tabRef.current) {
      const firstBtn = tabRef.current.querySelector("button");
      if (firstBtn instanceof HTMLElement) {
        firstBtn.focus();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length, active, handleKeyDown]);

  useEffect(() => {
    if (tabRef.current) {
      const firstBtn = tabRef.current.querySelectorAll("button");
      firstBtn[0].focus();
    }
  }, []);

  return (
    <>
      <div role="tablist" className="flex flex-row" ref={tabRef}>
        {items.map((item) => (
          <Tab
            id={item.id}
            name={item.name}
            active={active}
            setActive={setActive}
            key={item.id}
            aria-labelledby={`tab-${item.id}`}
          />
        ))}
      </div>
      {items.map((item) => (
        <div key={item.id}>
          <TabPanel content={item.content} id={item.id} active={active} />
        </div>
      ))}
    </>
  );
};

export default TabList;
