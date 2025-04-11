"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminEventForm from "@/components/AdminEventForm"
import HelpGuide from "@/components/HelpGuide"
import type { Event, User } from "@/types"
import { sendEventEmail } from "@/utils/sendEventEmail"
import { getSiteSettings, saveSiteSettings, type SiteSettings } from "@/utils/siteSettings"
import Link from "next/link"

export default function AdminDashboard() {
  const [settings, setSettings] = useState<SiteSettings>({
    title: "",
    heroImage: "",
    signUpInstructions: "",
    aboutTitle: "",
    aboutContent: "",
    aboutImage: "",
    contactTitle: "",
    contactSubtitle: "",
    services: {
      privateDinnerDescription: "",
      cookingClassDescription: "",
      cateringDescription: "",
      consultationDescription: "",
    },
    footerText: "",
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
    },
  })
  const [isSaving, setIsSaving] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [users, setUsers] = useState<User[]>([])
  const router = useRouter()
  const { toast } = useToast()

  // Load settings on component mount
  useEffect(() => {
    const currentSettings = getSiteSettings()
    setSettings(currentSettings)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save settings
      saveSiteSettings(settings)

      // Show success message
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCommunicateEvent = async (event: Event) => {
    const userEmails = users.map((user) => user.email)
    await sendEventEmail(event, userEmails)
  }

  const handleLogout = () => {
    // Clear the admin login cookie
    document.cookie = "adminLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md relative">
          <HelpGuide title="Site Settings">
            <p>
              <strong>What:</strong> The Site Settings section allows you to customize the content and appearance of
              your website.
            </p>
            <p>
              <strong>Where:</strong> Changes made here affect various pages throughout your website, including the home
              page, about page, and contact page.
            </p>
            <p>
              <strong>When:</strong> Update these settings whenever you need to refresh your website content or change
              your branding.
            </p>
            <p>
              <strong>Why:</strong> Keeping your website content up-to-date helps engage visitors and ensures accurate
              information is displayed.
            </p>
            <p>
              <strong>How:</strong> Click on the different tabs to access specific settings, make your changes, and
              click "Save Changes" to apply them.
            </p>
          </HelpGuide>
          <h2 className="text-xl font-bold mb-2">Site Settings</h2>
          <p className="text-gray-600">Manage website content and settings</p>
          <Link href="/admin" className="absolute inset-0 opacity-0">
            <span className="sr-only">Go to Site Settings</span>
          </Link>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md relative">
          <HelpGuide title="Analytics">
            <p>
              <strong>What:</strong> The Analytics dashboard provides insights into your website traffic and business
              performance.
            </p>
            <p>
              <strong>Where:</strong> Data is collected from visitor interactions with your website and booking/purchase
              activities.
            </p>
            <p>
              <strong>When:</strong> Check analytics regularly (weekly or monthly) to track trends and make informed
              business decisions.
            </p>
            <p>
              <strong>Why:</strong> Understanding your audience and business performance helps you optimize your
              services and marketing efforts.
            </p>
            <p>
              <strong>How:</strong> View different charts and metrics to analyze website visits, bookings, and revenue.
              Filter by date ranges for more detailed analysis.
            </p>
          </HelpGuide>
          <h2 className="text-xl font-bold mb-2">Analytics</h2>
          <p className="text-gray-600">View website traffic and business metrics</p>
          <Link href="/admin/analytics" className="absolute inset-0 opacity-0">
            <span className="sr-only">Go to Analytics</span>
          </Link>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md relative">
          <HelpGuide title="User Management">
            <p>
              <strong>What:</strong> The User Management section allows you to view and manage your newsletter
              subscribers and website members.
            </p>
            <p>
              <strong>Where:</strong> Users are added when they sign up through the website's sign-up form.
            </p>
            <p>
              <strong>When:</strong> Access this section when you need to communicate with users, manage your mailing
              list, or review subscriber information.
            </p>
            <p>
              <strong>Why:</strong> Building and maintaining a subscriber list helps you stay connected with interested
              clients and promote your services.
            </p>
            <p>
              <strong>How:</strong> Search for specific users, view their details, edit their information, or remove
              them from your list as needed.
            </p>
          </HelpGuide>
          <h2 className="text-xl font-bold mb-2">User Management</h2>
          <p className="text-gray-600">Manage newsletter subscribers</p>
          <Link href="/admin/users" className="absolute inset-0 opacity-0">
            <span className="sr-only">Go to User Management</span>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <HelpGuide title="Site Settings">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">General Tab</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Page Title:</strong> Sets the main title displayed on your website and browser tab. This
                  affects your site's SEO.
                </li>
                <li>
                  <strong>Hero Image URL:</strong> The large banner image on your homepage. Use a high-quality image
                  (recommended size: 1920x1080px).
                </li>
                <li>
                  <strong>Sign Up Instructions:</strong> The text displayed in the sign-up popup. Make it compelling to
                  encourage visitors to join your mailing list.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">About Page Tab</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>About Page Title:</strong> The heading for your About page.
                </li>
                <li>
                  <strong>About Page Content:</strong> Your biography and professional background. Use double line
                  breaks to create paragraphs.
                </li>
                <li>
                  <strong>About Page Image:</strong> A professional photo of yourself (recommended size: 500x500px).
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Contact Page Tab</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Page Title:</strong> The heading for your Contact page.
                </li>
                <li>
                  <strong>Contact Page Subtitle:</strong> Additional text explaining how and why visitors should contact
                  you.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Services Tab</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Service Descriptions:</strong> Detailed descriptions of each service you offer. Be specific
                  about what clients can expect.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Footer Tab</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Footer Text:</strong> The copyright notice or additional information displayed at the bottom
                  of every page.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Social Media Tab</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Social Media URLs:</strong> Links to your professional social media profiles. Include the full
                  URL (e.g., https://instagram.com/yourprofile).
                </li>
              </ul>
            </div>

            <div>
              <p>
                <strong>Important Tips:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always click "Save Changes" after updating any section.</li>
                <li>For images, use direct image URLs or upload images to a hosting service first.</li>
                <li>Preview your website after making changes to ensure everything displays correctly.</li>
              </ul>
            </div>
          </div>
        </HelpGuide>

        <h2 className="text-2xl font-bold mb-6">Site Settings</h2>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
            <TabsTrigger value="contact">Contact Page</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="heroImage">Hero Image URL</Label>
              <Input
                id="heroImage"
                value={settings.heroImage}
                onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
              />
              {settings.heroImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={settings.heroImage || "/placeholder.svg"}
                    alt="Hero preview"
                    className="w-full max-w-xs h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                      e.currentTarget.onerror = null
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="signUpInstructions">Sign Up Instructions</Label>
              <Textarea
                id="signUpInstructions"
                value={settings.signUpInstructions}
                onChange={(e) => setSettings({ ...settings, signUpInstructions: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <div>
              <Label htmlFor="aboutTitle">About Page Title</Label>
              <Input
                id="aboutTitle"
                value={settings.aboutTitle}
                onChange={(e) => setSettings({ ...settings, aboutTitle: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="aboutContent">About Page Content</Label>
              <Textarea
                id="aboutContent"
                value={settings.aboutContent}
                onChange={(e) => setSettings({ ...settings, aboutContent: e.target.value })}
                className="min-h-[200px]"
              />
            </div>
            <div>
              <Label htmlFor="aboutImage">About Page Image URL</Label>
              <Input
                id="aboutImage"
                value={settings.aboutImage}
                onChange={(e) => setSettings({ ...settings, aboutImage: e.target.value })}
              />
              {settings.aboutImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={settings.aboutImage || "/placeholder.svg"}
                    alt="About preview"
                    className="w-full max-w-xs h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                      e.currentTarget.onerror = null
                    }}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div>
              <Label htmlFor="contactTitle">Contact Page Title</Label>
              <Input
                id="contactTitle"
                value={settings.contactTitle}
                onChange={(e) => setSettings({ ...settings, contactTitle: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contactSubtitle">Contact Page Subtitle</Label>
              <Textarea
                id="contactSubtitle"
                value={settings.contactSubtitle}
                onChange={(e) => setSettings({ ...settings, contactSubtitle: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div>
              <Label htmlFor="privateDinnerDescription">Private Dinner Description</Label>
              <Textarea
                id="privateDinnerDescription"
                value={settings.services.privateDinnerDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      privateDinnerDescription: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="cookingClassDescription">Cooking Class Description</Label>
              <Textarea
                id="cookingClassDescription"
                value={settings.services.cookingClassDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      cookingClassDescription: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="cateringDescription">Catering Description</Label>
              <Textarea
                id="cateringDescription"
                value={settings.services.cateringDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      cateringDescription: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="consultationDescription">Consultation Description</Label>
              <Textarea
                id="consultationDescription"
                value={settings.services.consultationDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    services: {
                      ...settings.services,
                      consultationDescription: e.target.value,
                    },
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
            <div>
              <Label htmlFor="footerText">Footer Text</Label>
              <Input
                id="footerText"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div>
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={settings.socialMedia.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      instagram: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={settings.socialMedia.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      facebook: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={settings.socialMedia.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialMedia: {
                      ...settings.socialMedia,
                      twitter: e.target.value,
                    },
                  })
                }
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md relative">
        <HelpGuide title="Event Management">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Creating Events</h4>
              <p>
                <strong>What:</strong> The Event Management section allows you to create, edit, and communicate about
                upcoming events.
              </p>
              <p>
                <strong>Where:</strong> Events you create will appear on your website's homepage in the "Upcoming
                Events" section.
              </p>
              <p>
                <strong>When:</strong> Add new events as soon as they are scheduled to give visitors advance notice.
              </p>
              <p>
                <strong>Why:</strong> Promoting your events helps attract attendees and showcases your active schedule.
              </p>
              <p>
                <strong>How:</strong> Fill out the event form with the following information:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Event Date:</strong> Select the date when the event will take place.
                </li>
                <li>
                  <strong>Event Description:</strong> Provide a clear, engaging description of the event. Include key
                  details like time, location, and what attendees can expect.
                </li>
                <li>
                  <strong>Event Image URL:</strong> Add an image URL that represents the event. Use high-quality images
                  (recommended size: 1200x600px).
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Communicating Events</h4>
              <p>
                <strong>What:</strong> The "Communicate Event" button allows you to send email notifications about
                events to your subscribers.
              </p>
              <p>
                <strong>Where:</strong> Emails will be sent to all users who have subscribed to your newsletter.
              </p>
              <p>
                <strong>When:</strong> Send communications about 2-4 weeks before an event, with a reminder 2-3 days
                before.
              </p>
              <p>
                <strong>Why:</strong> Email notifications increase event attendance and keep your audience engaged.
              </p>
              <p>
                <strong>How:</strong> Click the "Communicate Event" button next to an existing event to send an email to
                all subscribers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Best Practices</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use descriptive, engaging titles for your events.</li>
                <li>Include all relevant details: date, time, location, cost, and what to expect.</li>
                <li>Use high-quality images that accurately represent the event.</li>
                <li>Send event communications at optimal times (Tuesday-Thursday mornings).</li>
                <li>Update or remove past events to keep your website current.</li>
              </ul>
            </div>
          </div>
        </HelpGuide>

        <h2 className="text-2xl font-bold mb-4">Event Management</h2>
        <AdminEventForm />

        <h3 className="text-xl font-bold mt-8 mb-4">Existing Events</h3>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="border p-4 mb-4 rounded">
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <Button onClick={() => handleCommunicateEvent(event)}>Communicate Event</Button>
            </div>
          ))
        ) : (
          <p>No events found. Create your first event above.</p>
        )}
      </div>
    </div>
  )
}
