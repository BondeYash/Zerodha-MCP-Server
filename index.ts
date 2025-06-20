import {placeOrder} from './trade.ts'
import { getProfile } from './trade.ts';
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Add an addition tool
server.registerTool("add",
  {
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.registerTool(
  "factorial",
  {
    inputSchema: { a: z.number() }
  },
  async ({ a }) => {
    let ans = 1;
    for (let i = 2; i <= a; i++) {
      ans *= i;
    }

    return {
      content: [
        {
          type: "text",
          text: `Factorial of ${a} is ${ans}`
        }
      ]
    };
  }
);

server.registerTool(
  "buy-stock",
  {
    inputSchema: { stock :z.string () , qnt: z.number() },
    description:"Buys a Share on the Zerodha Exchange for the user. According to given command"
  },
  async ({ stock , qnt}) => {
    
    placeOrder(stock , qnt , "BUY")

    return {
      content: [
        {
          type: "text",
          text: "Stock Bought"
        }
      ]
    };
  }
);

server.registerTool(
  "sell-stock",
  {
    inputSchema: { stock :z.string () , qnt: z.number() },
    description: "Sells the Stock for the user on the Zerodha Exchange."
  },
  async ({ stock , qnt}) => {
    
    placeOrder(stock , qnt , "SELL")

    return {
      content: [
        {
          type: "text",
          text: "Stock Sold"
        }
      ]
    };
  }
);

server.registerTool(
  "get-profile",
  {
    inputSchema: { }
  },
  async ({ }) => {
    
    getProfile()

    return {
      content: [
        {
          type: "text",
          text: "Profile is being displayed"
        }
      ]
    };
  }
);





const transport = new StdioServerTransport();
await server.connect(transport);





