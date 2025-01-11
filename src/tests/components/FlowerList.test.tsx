import { render, screen } from "@testing-library/react";
import FlowerList from "@/components/FlowerList/FlowerList";
import { Provider } from "react-redux";
import store from "@/store";
import "@testing-library/jest-dom";

test("renders FlowerList component", () => {
  render(
    <Provider store={store}>
      <FlowerList />
    </Provider>
  );
  expect(screen.getByText(/Discover flowers around you/i)).toBeInTheDocument();
});

test("renders flowers", async () => {
  render(
    <Provider store={store}>
      <FlowerList />
    </Provider>
  );
  const flowerItems = await screen.findAllByRole("heading", { level: 3 });
  expect(flowerItems.length).toBeGreaterThan(0);
});

test("renders search input", () => {
  render(
    <Provider store={store}>
      <FlowerList />
    </Provider>
  );
  expect(
    screen.getByPlaceholderText(/Looking for something specific?/i)
  ).toBeInTheDocument();
});
