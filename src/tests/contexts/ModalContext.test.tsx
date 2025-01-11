import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useModal, ModalProvider } from "../../contexts/ModalContext";
import { ReactNode } from "react";

const TestComponent = ({ children }: { children: ReactNode }) => {
  const { showModal, hideModal } = useModal();

  return (
    <div>
      <button
        onClick={() =>
          act(() =>
            showModal(<div data-testid="modal-content">Modal Content</div>)
          )
        }
      >
        Show Modal
      </button>
      <button onClick={() => act(() => hideModal())}>Hide Modal</button>
      {children}
    </div>
  );
};

describe("ModalContext", () => {
  it("should show and hide modal", () => {
    render(
      <ModalProvider>
        <TestComponent children={undefined} />
      </ModalProvider>
    );

    const showModalButton = screen.getByText("Show Modal");
    const hideModalButton = screen.getByText("Hide Modal");

    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();

    act(() => {
      showModalButton.click();
    });
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();

    act(() => {
      hideModalButton.click();
    });
    expect(screen.queryByTestId("modal-content")).not.toBeInTheDocument();
  });
});
