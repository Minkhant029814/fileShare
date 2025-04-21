import { queryClient, useApp } from "../ThemedApp";
import { Alert, Box } from "@mui/material";
import Form from "../components/Form";
import Item from "../components/Item";
import { useMutation, useQuery } from "@tanstack/react-query";
export const api = "http://localhost:8000";
export default function Home() {
  // const [data, setData] = useState([]);
  const { showForm, setGlobalMsg } = useApp();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}:${res.statusText}`);
      }
      return res.json();
    },
  });

  const remove = useMutation({
    mutationFn: async (id) => {
      await fetch(`${api}/content/posts/${id}`, { method: "DELETE" });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      queryClient.setQueriesData(["posts"], (old = []) =>
        old.filter((item) => item.id !== id)
      );
      setGlobalMsg("A Post Deleted");
    },
  });
  const add = (content, name) => {
    const id = data[0].id + 1;
    setData([...data, { content, name, id }]);
    setGlobalMsg("An Item Added");
  };
  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...........</Box>;
  }

  // const [loading, setLoading] = useState(true);

  // const [error, setError] = useState(false);
  // useEffect(() => {
  //   fetch(`${api}/content/posts`)
  //     .then(async (res) => {
  //       if (res.ok) {
  //         setData(await res.json());
  //         setLoading(false);
  //       } else {
  //         setError(true);
  //       }
  //     })
  //     .catch(() => {
  //       setError(true);
  //     });
  // }, []);
  // const [data, setData] = useState([
  //   { id: 3, content: "Yay, interesting.", name: "Chris" },
  //   { id: 2, content: "React is fun.", name: "Bob" },
  //   { id: 1, content: "Hello, World!", name: "Alice" },
  // ]);

  return (
    <Box>
      {showForm && <Form add={add} />}
      {data.map((item) => {
        return <Item key={item.id} item={item} remove={remove.mutate} />;
      })}
    </Box>
  );
}
