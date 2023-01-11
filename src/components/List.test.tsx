import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("List Component", () => {
  it("should render list items", async () => {
    const { getByText, rerender, queryByText, unmount } = render(
      <List initialItens={["Miguel", "João", "Fabiano", "Paulo"]} />
    );

    expect(getByText("Miguel")).toBeInTheDocument();
    expect(getByText("João")).toBeInTheDocument();
    expect(getByText("Fabiano")).toBeInTheDocument();
    expect(getByText("Paulo")).toBeInTheDocument();

    unmount();
    render(<List initialItens={["Carlos"]} />);

    expect(getByText("Carlos")).toBeInTheDocument();
    expect(queryByText("João")).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <List initialItens={[]} />
    );

    const addButton = getByText("adicionar");
    const Input = getByPlaceholderText("type something");

    await userEvent.type(Input, "Gabriel");
    userEvent.click(addButton);

    //ACTUAL
    expect(await findByText("Gabriel")).toBeInTheDocument();

    // DEPRECATED
    // await waitFor(() => {
    // expect(getByText("Gabriel")).toBeInTheDocument();
    // });
  });

  it("should be able to remove an item from the list", async () => {
    const { getByText, getAllByText, queryByText } = render(
      <List initialItens={["Miguel"]} />
    );

    const removeButtons = getAllByText("remove");
    userEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getAllByText('Miguel')
    // });

    await waitFor(() => {
      expect(queryByText("Miguel")).not.toBeInTheDocument();
    });
  });
});
