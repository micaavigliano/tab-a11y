import React, {
  Dispatch,
  SetStateAction,
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
  return (
    <div>
      <button
        role="tab"
        className={`${
          id === active ? "bg-pink-200" : "bg-transparent"
        } py-2 px-4 divide-y divide-gray-400`}
        onClick={() => setActive(id)}
      >
        {name}
      </button>
    </div>
  );
};

const TabPanel: React.FC<ITabPanel> = ({ content, id, active }) => {
  return (
    <>
      {id === active ? (
        <section
          role="tabpanel"
          tabIndex={0}
          className={`bg-pink-300 w-9/12 border-solid border-2 border-black h-40 text-left p-2`}
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
  const [active, setActive] = useState(1);
  const tabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActive((prevIndex) =>
          prevIndex < items.length ? prevIndex + 1 : 1
        );
        console.log(active);
      } else if (event.key === "ArrowLeft") {
        setActive((prevIndex) =>
          prevIndex > 1 ? prevIndex - 1 : items.length
        );
        console.log(active, "active left");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [items.length, active]);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.focus();
    }
  }, []);

  return (
    <>
      <div role="tablist" className="flex flex-row" ref={tabRef}>
        {items.map((item) => (
          <div key={item.id}>
            {" "}
            <div role="presentation">
              <Tab
                id={item.id}
                name={item.name}
                active={active}
                setActive={setActive}
              />
            </div>
          </div>
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
