import { Box, Button, TextField } from "@mui/material";
import Item from "../components/Item";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient, useApp } from "../ThemedApp";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./Home";

export default function Comments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setGlobalMsg } = useApp();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts/${id}`);
      if (!res.ok) {
        throw new Error(`Error ${res.status}:${res.statusText}`);
      }
      return res.json();
    },
  });

  const removePost = useMutation({
    mutationFn: async (id) => {
      await fetch(`${api}/content/posts/${id}`, { method: "DELETE" });
      navigate("/");
      setGlobalMsg("A post Deleted");
    },
  });

  const useRemoveComment = () => {
    return useMutation({
      mutationFn: async (id) => {
        await fetch(`${api}/content/comments/${id}`, {
          method: "DELETE",
        });
      },
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: ["comments"] });
        const previousComments = queryClient.getQueryData(["comments"]);
        queryClient.setQueryData([
          "comments",
          (old) => {
            return {
              ...old,
              comments: old?.comments?.filter(comment),
            };
          },
        ]);
      },
    });
  };

  return (
    <Box>
      <Item
        primary
        key={1}
        item={{
          id: 1,
          content: "Initial post content From Alice",
          name: "Alice",
        }}
        remove={() => {}}
      />
      <Item
        key={2}
        item={{
          id: 2,
          content: "A comment from Bob",
          name: "Bob",
        }}
        remove={() => {}}
      />
      <Item
        key={3}
        item={{
          id: 3,
          content: "A comment reply from Alice",
          name: "Alice",
        }}
        remove={() => {}}
      />
      <form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
          <TextField multiline placeholder="Your Comment" />
          <Button type="submit" variant="contained">
            Reply
          </Button>
        </Box>
      </form>
    </Box>
  );
}
