import "./App.css";
import TabList from "./components/TabList";

function App() {
  return (
    <main id="main-id">
      <TabList
        items={[
          {
            name: "tab 1",
            id: 1,
            content:
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, ratione? Quaerat incidunt voluptate odit ullam, veritatis ipsam voluptatum cum maxime non. Quas beatae recusandae commodi odio quae delectus? Sapiente, similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum eum, distinctio cumque odit inventore, necessitatibus quos excepturi dolore tempora doloremque repellendus ea ipsa maxime mollitia reprehenderit corrupti qui nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rerum eum, distinctio cumque odit inventore, necessitatibus quos excepturi dolore tempora doloremque repellendus ea ipsa maxime mollitia reprehenderit corrupti qui nemo. ",
          },
          {
            name: "tab 2",
            id: 2,
            content:
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit neque laboriosam ipsum. Repellendus itaque consequatur, sapiente cumque nulla atque molestiae quaerat vel earum ex molestias fugiat illum voluptatibus saepe minima.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, ratione? Quaerat incidunt voluptate odit ullam, veritatis ipsam voluptatum cum maxime non. Quas beatae recusandae commodi odio quae delectus? Sapiente, similique.",
          },
          {
            name: "tab 3",
            id: 3,
            content: (
              <>
                <label className="font-semibold mb-1" htmlFor="input">
                  Input
                </label>
                <input
                  id="input"
                  type="text"
                  className="border border-gray-400 px-8"
                  placeholder="hello"
                />
              </>
            ),
          },
        ]}
      />
    </main>
  );
}

export default App;
