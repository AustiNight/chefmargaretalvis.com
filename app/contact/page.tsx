"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getSiteSettings } from "@/utils/siteSettings"

export default function ContactBooking() {
  // Form fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [contactType, setContactType] = useState("general")

  // Booking-specific fields
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("")
  const [serviceType, setServiceType] = useState("")

  // Page content from settings
  const [contactTitle, setContactTitle] = useState("Contact Chef Margaret")
  const [contactSubtitle, setContactSubtitle] = useState("")

  useEffect(() => {
    const settings = getSiteSettings()
    if (settings.contactTitle) {
      setContactTitle(settings.contactTitle)
    }
    if (settings.contactSubtitle) {
      setContactSubtitle(settings.contactSubtitle)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (contactType === "general") {
      // Handle general contact submission
      console.log("Submitting general contact:", { name, email, message })
    } else {
      // Handle booking submission
      console.log("Submitting booking:", {
        name,
        email,
        date,
        guests,
        serviceType,
        message,
      })
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{contactTitle}</h1>
      {contactSubtitle && <p className="text-lg mb-8">{contactSubtitle}</p>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="space-y-4">
          <Label>What would you like to do?</Label>
          <RadioGroup value={contactType} onValueChange={setContactType} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general">General Inquiry</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="booking" id="booking" />
              <Label htmlFor="booking">Book a Service</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {contactType === "booking" && (
            <>
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input id="guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select id="serviceType" value={serviceType} onValueChange={setServiceType} required>
                  <option value="">Select a service</option>
                  <option value="private-dinner">Private Dinner</option>
                  <option value="cooking-class">Cooking Class</option>
                  <option value="catering">Catering</option>
                  <option value="consultation">Consultation</option>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="message">{contactType === "general" ? "Message" : "Additional Details"}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required={contactType === "general"}
              rows={5}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          {contactType === "general" ? "Send Message" : "Request Booking"}
        </Button>
      </form>
    </div>
  )
}
