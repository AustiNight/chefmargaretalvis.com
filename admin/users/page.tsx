"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import HelpGuide from "@/components/HelpGuide"
import type { User } from "@/types"

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Fetch users from API
    // This is a placeholder, replace with actual API call
    setUsers([
      { id: 1, fullName: "John Doe", email: "john@example.com", address: "123 Main St" },
      { id: 2, fullName: "Jane Smith", email: "jane@example.com", address: "456 Oak Ave" },
      { id: 3, fullName: "Mike Johnson", email: "mike@example.com" },
    ])
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="relative">
        <HelpGuide title="User Management">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Understanding User Management</h4>
              <p>
                <strong>What:</strong> The User Management section allows you to view, search, edit, and manage your
                newsletter subscribers and website members.
              </p>
              <p>
                <strong>Where:</strong> Users are added when they sign up through the website's sign-up form or register
                for events.
              </p>
              <p>
                <strong>When:</strong> Access this section when you need to communicate with users, manage your mailing
                list, or review subscriber information.
              </p>
              <p>
                <strong>Why:</strong> Maintaining an organized subscriber list helps you effectively communicate with
                interested clients and promote your services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Features</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Search:</strong> Quickly find specific users by typing their name or email in the search box.
                </li>
                <li>
                  <strong>User Information:</strong> View each user's name, email, and address (if provided).
                </li>
                <li>
                  <strong>Edit:</strong> Update user information as needed to keep your records current.
                </li>
                <li>
                  <strong>Delete:</strong> Remove users who have unsubscribed or requested to be removed from your list.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Best Practices for User Management</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Regular Maintenance:</strong> Review your user list monthly to ensure it's up-to-date.
                </li>
                <li>
                  <strong>Respect Privacy:</strong> Only collect and store information that users have willingly
                  provided.
                </li>
                <li>
                  <strong>Segmentation:</strong> Consider categorizing users based on their interests or past
                  interactions for more targeted communications.
                </li>
                <li>
                  <strong>Communication Frequency:</strong> Avoid overwhelming users with too many emails. Aim for
                  quality over quantity.
                </li>
                <li>
                  <strong>Compliance:</strong> Ensure your user management practices comply with privacy regulations
                  like GDPR or CCPA.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Using User Data Effectively</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Send personalized event invitations based on user location or past attendance.</li>
                <li>Create targeted marketing campaigns for specific user segments.</li>
                <li>Analyze user demographics to better understand your audience.</li>
                <li>Use subscriber growth as a metric for measuring your website's effectiveness.</li>
              </ul>
            </div>
          </div>
        </HelpGuide>

        <h1 className="text-4xl font-bold mb-8">User Management</h1>
      </div>

      <div className="mb-6">
        <Label htmlFor="search">Search Users</Label>
        <Input
          id="search"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Table>
        <TableCaption>List of newsletter subscribers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address || "N/A"}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p>No users found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
