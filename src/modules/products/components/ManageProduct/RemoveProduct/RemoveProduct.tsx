import "./RemoveProduct.scss";
import { Card, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { Button, Paper } from "@mui/material";

export interface RemoveProductProps {
  handleDelete: Function;
  params: string[];
}

export default function RemoveProduct({ params, handleDelete }: RemoveProductProps) {
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  return (
    <Paper elevation={3}>
      <div id="RemoveProduct">
        <Button
          className="btn"
          variant="contained"
          color="secondary"
          disabled={!params.length}
          onClick={() => setOpenDialogRemove(true)}
        >
          Remove selected
        </Button>
        {openDialogRemove && (
          <div className="dialogRemove d-flex align-items-center justify-content-center">
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <span className="title">Confirm Delete</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="body">Do you want to delete this product?</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn"
                      onClick={() => {
                        setOpenDialogRemove(false);
                        handleDelete();
                      }}
                    >
                      YES
                    </button>
                    <button
                      className="btn"
                      onClick={() => setOpenDialogRemove(false)}
                    >
                      NO
                    </button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        )}
      </div>
    </Paper>
  );
}
