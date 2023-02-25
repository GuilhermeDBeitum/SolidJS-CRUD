import { createSignal } from "solid-js";
import { nanoid } from "nanoid";

function App() {
  const [id, setId] = createSignal("");
  const [productName, setProductName] = createSignal("");
  const [amount, setAmount] = createSignal("");
  const [users, setUsers] = createSignal([]);
  const [buttonName, setButtonName] = createSignal("");

  const deleteUser = (id) => {
    setUsers([...users().filter((user) => user.id !== id)]);
  };

  const editUser = (id) => {
    const user = users().filter((user) => user.id === id);
    setProductName(user[0].productName);
    setAmount(user[0].amount);
    setId(id);
    setButtonName("Edit");
  };
  const submitUser = () => {
    !productName() || !amount() ? setButtonName("error") : setButtonName("Add ");
    if (buttonName() === "Add " && id() !== "") {
      setUsers([...users().filter((user) => user.id !== id()), { id: id(), productName: productName(), amount: amount() }]);
    } else if (buttonName() === "Add ") {
      setUsers([...users(), { id: nanoid(3), productName: productName(), amount: amount() }]);
    }
    setId("");
    setProductName("");
    setAmount("");
  };

  return (

    <div class="dark:bg-gray-800 flex flex-col items-center justify-center min-h-screen py-2">
      <p class="text-2xl text-gray-700 dark:text-gray-200 font-bold mb-8">SolidJS CRUD</p>

      <div class="w-full max-w-xs">
        <div class="dark:bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-6">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="productName">
              Product
            </label>
            <input value={productName()} onInput={(e) => setProductName(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="productName" type="text" />
            {buttonName() === 'error' ? <h2>
              <p class="text-red-500 text-xs italic">Please choose a product name.</p>
            </h2> : ''}
          </div>
          <div class="mb-6">
            <label class="block text-gray-200 text-sm font-bold mb-2" for="amount">
              Amount
            </label>
            <input value={amount()} onInput={(e) => setAmount(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="number" />

            {buttonName() === 'error' ? <h2>
              <p class="text-red-500 text-xs italic">Please choose a amount.</p>
            </h2> : ''}


          </div>
          <div class="flex items-center justify-center ">
            <button onClick={() => buttonName() === 'Add ' ? submitUser() : submitUser(id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="button">
              {buttonName() === 'Edit' ? 'Edit' : 'Add '}
            </button>
          </div>
        </div>
      </div>
      <div class="relative rounded-xl overflow-auto dark:bg-gray-900">
        <div class="shadow-sm overflow-hidden my-8">
          <table class="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Id</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Product</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Amount</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-6 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Edit</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Delete</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
              {users().map((user) => (
                <tr class="border-b dark:border-slate-600">
                  <td class="p-4 pl-8 text-sm text-slate-800 dark:text-slate-100">{user.id}</td>
                  <td class="p-4 pl-8 text-sm text-slate-800 dark:text-slate-100">{user.productName}</td>
                  <td class="p-4 pl-8 text-sm text-slate-800 dark:text-slate-100">{user.amount}</td>
                  <td>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 py-2 px-4 rounded" onClick={() => editUser(user.id)}>Edit</button></td>
                  <td>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
