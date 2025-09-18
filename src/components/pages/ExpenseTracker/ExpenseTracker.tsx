import React, { useState } from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Chart, ChartSeries, ChartSeriesItem, ChartTitle, ChartLegend } from '@progress/kendo-react-charts';
import { Button } from '@progress/kendo-react-buttons';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const ExpenseTracker: React.FC = () => {
  // TODO: Replace with real CRUD hooks or connect to backend
  // Example: useExpenses(), useCreateExpense(), useUpdateExpense(), useDeleteExpense()
  // For now, use local state and sample data
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'Food', amount: 50, date: '2023-11-01', description: 'Lunch' },
    { id: 2, category: 'Transport', amount: 20, date: '2023-11-01', description: 'Bus' },
    { id: 3, category: 'Accommodation', amount: 100, date: '2023-11-01', description: 'Hotel' },
  ]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editID, setEditID] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<Expense | null>(null);

  // Custom cell components for editable grid
  const CategoryCell = (props: any) => {
    if (editID === props.dataItem.id) {
      return (
        <td>
          <input value={editRow?.category || ''} onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'category')} />
        </td>
      );
    }
    return <td>{props.dataItem.category}</td>;
  };
  const AmountCell = (props: any) => {
    if (editID === props.dataItem.id) {
      return (
        <td>
          <input type="number" value={editRow?.amount || 0} onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'amount')} />
        </td>
      );
    }
    return <td>${props.dataItem.amount}</td>;
  };
  const DateCell = (props: any) => {
    if (editID === props.dataItem.id) {
      return (
        <td>
          <input type="date" value={editRow?.date || ''} onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'date')} />
        </td>
      );
    }
    return <td>{props.dataItem.date}</td>;
  };
  const DescriptionCell = (props: any) => {
    if (editID === props.dataItem.id) {
      return (
        <td>
          <input value={editRow?.description || ''} onChange={e => handleChange(e as React.ChangeEvent<HTMLInputElement>, 'description')} />
        </td>
      );
    }
    return <td>{props.dataItem.description}</td>;
  };
  const ActionsCell = (props: any) => {
    if (editID === props.dataItem.id) {
      return (
        <td>
          <Button size="small" themeColor="primary" onClick={handleSave} style={{ marginRight: 4 }}>Save</Button>
          <Button size="small" onClick={handleCancel}>Cancel</Button>
        </td>
      );
    }
    return (
      <td>
        <Button size="small" onClick={() => handleEdit(props.dataItem)}>Edit</Button>
      </td>
    );
  };

  const budget = 200;
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryData = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.entries(categoryData).map(([category, amount]) => ({ category, amount }));

  // Editable Grid logic (replace with real CRUD)
  const handleEdit = (item: Expense) => {
    setEditID(item.id);
    setEditRow({ ...item });
  };
  const handleCancel = () => {
    setEditID(null);
    setEditRow(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Expense) => {
    if (editRow) setEditRow({ ...editRow, [field]: e.target.value });
  };
  const handleSave = () => {
    if (editRow) {
      setExpenses(expenses.map(exp => exp.id === editRow.id ? { ...editRow, amount: Number(editRow.amount) } : exp));
      setNotification({ type: 'success', message: 'Expense updated!' });
      setEditID(null);
      setEditRow(null);
    }
  };
  const handleAdd = () => {
    const newExpense: Expense = {
      id: expenses.length + 1,
      category: 'Other',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: '',
    };
    setExpenses([...expenses, newExpense]);
    setNotification({ type: 'success', message: 'Expense added!' });
    setEditID(newExpense.id);
    setEditRow(newExpense);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ 
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        marginBottom: 24
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32
        }}>
          <h2 style={{ 
            fontSize: '28px',
            fontWeight: 600,
            color: '#2D3748',
            margin: 0
          }}>Expense Tracker</h2>
          <div style={{
            background: '#F7FAFC',
            padding: '12px 24px',
            borderRadius: 8,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <span style={{ color: '#718096', marginRight: 8 }}>Budget:</span>
            <span style={{ 
              fontWeight: 600,
              color: totalSpent > budget ? '#E53E3E' : '#38A169'
            }}>${totalSpent}</span>
            <span style={{ color: '#718096' }}> / ${budget}</span>
          </div>
        </div>

        {notification && (
          <NotificationGroup style={{ position: 'fixed', top: 100, right: 24, zIndex: 2000 }}>
            <Notification
              type={{ style: notification.type, icon: true }}
              closable
              onClose={() => setNotification(null)}
            >
              {notification.message}
            </Notification>
          </NotificationGroup>
        )}

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          marginBottom: 32,
          background: '#F7FAFC',
          padding: 24,
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ background: '#fff', padding: 20, borderRadius: 8 }}>
            <Chart style={{ height: 300 }}>
              <ChartTitle text="Expenses by Category" />
              <ChartLegend position="bottom" orientation="horizontal" />
              <ChartSeries>
                <ChartSeriesItem
                  type="pie"
                  data={chartData}
                  field="amount"
                  categoryField="category"
                />
              </ChartSeries>
            </Chart>
          </div>
          <div style={{ background: '#fff', padding: 20, borderRadius: 8 }}>
            <h3 style={{ 
              fontSize: '18px',
              fontWeight: 500,
              color: '#2D3748',
              marginBottom: 16
            }}>Category Breakdown</h3>
            {Object.entries(categoryData).map(([category, amount]) => (
              <div key={category} style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #E2E8F0'
              }}>
                <span style={{ color: '#4A5568' }}>{category}</span>
                <span style={{ fontWeight: 500, color: '#2D3748' }}>${amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          background: '#F7FAFC',
          padding: 24,
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <h3 style={{ 
              fontSize: '20px',
              fontWeight: 500,
              color: '#2D3748',
              margin: 0
            }}>Expense Details</h3>
            <Tooltip anchorElement="target" position="top" content="Add a new expense row">
              <Button
                themeColor="primary"
                onClick={handleAdd}
                style={{
                  padding: '8px 20px'
                }}
              >
                Add Expense
              </Button>
            </Tooltip>
          </div>
          
          <Grid
            data={expenses}
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: '12px',
              border: '1px solid #E2E8F0'
            }}
          >
            <GridToolbar>
              {/* Toolbar for future filter/search or export */}
            </GridToolbar>
            <GridColumn field="category" title="Category" cells={{ data: CategoryCell }} />
            <GridColumn field="amount" title="Amount" cells={{ data: AmountCell }} />
            <GridColumn field="date" title="Date" cells={{ data: DateCell }} />
            <GridColumn field="description" title="Description" cells={{ data: DescriptionCell }} />
            <GridColumn title="Actions" cells={{ data: ActionsCell }} />
          </Grid>
        </div>
      </div>
      {/*
        To connect to a backend, replace local state with CRUD hooks:
        - useExpenses() to fetch expenses
        - useCreateExpense(), useUpdateExpense(), useDeleteExpense() for actions
        See /src/hooks/ for examples or add your own.
      */}
    </div>
  );
};

export default ExpenseTracker;
