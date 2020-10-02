import { expect } from "chai";
import { UserResolver } from "../../src/resolvers/user";
import { UserInput } from "../../src/types/inputs/UserInput";
import { adminCtx, employeeCtx, emptyCtx, managerCtx } from "../utils/contexts";

describe("User Resolver Tests", async () => {
  const resolver = new UserResolver();

  it("me as an admin", async () => {
    const response = await resolver.me(adminCtx);
    expect(response).to.exist;
    expect(response)
      .to.has.property("employeeEmail")
      .and.equals("admin@test.com");
  });

  it("me as a manager", async () => {
    const response = await resolver.me(managerCtx);
    expect(response).to.exist;
    expect(response)
      .to.has.property("employeeEmail")
      .and.equals("manager@test.com");
  });

  it("me as an employee", async () => {
    const response = await resolver.me(employeeCtx);
    expect(response).to.exist;
    expect(response)
      .to.has.property("employeeEmail")
      .and.equals("employee@test.com");
  });

  it("login with correct credentials", async () => {
    const input = new UserInput();
    input.email = "admin@test.com";
    input.password = "admin password";

    const response = await resolver.login(input, emptyCtx);

    expect(response.errors).to.not.exist;
    expect(response.data).to.exist;
  });

  it("login with wrong email", async () => {
    const input = new UserInput();
    input.email = "notanadmin@test.com";
    input.password = "admin password";

    const response = await resolver.login(input, emptyCtx);

    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.data).to.not.exist;
  });

  it("login with wrong password", async () => {
    const input = new UserInput();
    input.email = "admin@test.com";
    input.password = "wrong password";

    const response = await resolver.login(input, emptyCtx);

    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(1);
    expect(response.data).to.not.exist;
  });

  it("login with invalid input", async () => {
    const input = new UserInput();
    input.email = "admin";
    input.password = "p";

    const response = await resolver.login(input, emptyCtx);

    expect(response.errors).to.exist;
    expect(response.errors).to.have.length(2);
    expect(response.data).to.not.exist;
  });
});
