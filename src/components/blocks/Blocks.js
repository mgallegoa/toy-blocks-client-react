import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  blocksStatusStartAction,
  blocksStatusFailureAction,
  blocksStatusSuccessAction,
} from "../../actions/blocks";
import { getBlocksFromUrl } from "../../services/HTTPServices";

const Blocks = ({ url }) => {
  const classes = useStyles();
  const nodesAllBlocks = useSelector((state) => state.blocks);
  const nodeUrlBlocks =
    nodesAllBlocks && nodesAllBlocks.length > 0
      ? nodesAllBlocks.find((n) => n.url === url)
      : undefined;
  const dispatch = useDispatch();
  if (!nodeUrlBlocks || nodeUrlBlocks.url !== url) {
    checkNodeBlocksStatus(url);
  }

  async function checkNodeBlocksStatus(url) {
    try {
      dispatch(blocksStatusStartAction(url));
      const res = await getBlocksFromUrl(url);

      if (res.status >= 400) {
        dispatch(
          blocksStatusFailureAction(
            url,
            `Server error loading the blocks for node ${url}`
          )
        );
      }

      const json = await res.json();

      dispatch(blocksStatusSuccessAction(url, json));
    } catch (err) {
      dispatch(
        blocksStatusFailureAction(
          url,
          `Error loading the blocks for node ${url}`
        )
      );
    }
  }

  return (
    <Box className={classes.container}>
      {nodeUrlBlocks ? (
        nodeUrlBlocks.isLoading ? (
          <Typography className={classes.userMessage}>Loading...</Typography>
        ) : nodeUrlBlocks.isError ? (
          <Typography className={classes.userMessage}>
            Error loading data
          </Typography>
        ) : !nodeUrlBlocks.nodeBlocks ||
          nodeUrlBlocks.nodeBlocks.length == 0 ? (
          <Typography className={classes.userMessage}>No Data</Typography>
        ) : (
          nodeUrlBlocks.nodeBlocks.map((block) => (
            <Box
              className={classes.container_block}
              key={block.attributes.data}
            >
              <Typography className={classes.block_index}>
                {("000" + block.attributes.index).slice(-3) +
                  block.attributes.index}
              </Typography>
              <Typography className={classes.block_data}>
                {block.attributes.data}
              </Typography>
            </Box>
          ))
        )
      ) : (
        <Typography className={classes.userMessage}>No Data</Typography>
      )}
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
  },
  userMessage: {
    alignItems: "center",
  },
  container_block: {
    borderRadius: 2,
    fontStyle: "normal",
    fontWeight: "bold",
    padding: "7px 7.60px 8px 8px",
    marginBottom: 8,
    background: "rgba(0, 0, 0, 0.16)",
  },
  block_index: {
    fontSize: 9,
    color: "#304FFE",
    lineHeight: "16px",
    letterSpacing: 1.5,
  },
  block_Data: {
    fontSize: 13,
    color: "#263238",
    lineHeight: "20px",
    letterSpacing: 0.25,
  },
}));

Blocks.propTypes = {
  url: PropTypes.string.isRequired,
  nodeBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      attributes: PropTypes.shape({
        index: PropTypes.number,
        timestamp: PropTypes.number,
        data: PropTypes.string,
        "previous-hash": PropTypes.string,
        hash: PropTypes.string,
      }),
    }).isRequired
  ),
};

export default Blocks;
