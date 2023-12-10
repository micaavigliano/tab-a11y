import "./App.css";
import TabList from "./components/TabList";

function App() {
  return (
    <main>
      <TabList
        items={[
          {
            name: "tab 1",
            id: 1,
            content:
              "content 1 sdfsdfasdfasdfgkjbfaf sdhjfbsajdfhasdjhflasd asjdfhblasjf lsdjhavbsdf sdfjhasvdfjasd f asdhjfasljfasdf sadfjhbasdjfweruwiuefi sv al;pqw;erb fasjdfvasgdfsdfkjbsdfhha wjehrwleurfwvelf iuhsduifasblabs",
          },
          { name: "tab 2", id: 2, content: "content 2" },
          { name: "tab 3", id: 3, content: "content 3" },
        ]}
      />
    </main>
  );
}

export default App;
