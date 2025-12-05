import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BadgeCheck,
  CircleDot,
  Contact2,
  LogOut,
  TrendingUp,
  LayoutGrid,
  Hammer,
  Loader2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

// Simple status -> color mapping using brand palette
const STATUS_STYLES = {
  lead: 'bg-secondary/10 text-secondary border-secondary/40',
  negotiation: 'bg-accent/10 text-accent border-accent/40',
  closed_won: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  closed_lost: 'bg-red-100 text-red-800 border-red-300',
}

const STATUS_LABELS = {
  lead: 'Lead',
  negotiation: 'Negotiation',
  closed_won: 'Closed Won',
  closed_lost: 'Closed Lost',
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [deals, setDeals] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    openDeals: 0,
    pipelineValue: 0,
    activeContacts: 0,
  })

  useEffect(() => {
    const authed =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('lunar_admin_authed') === 'true'
        : false
    if (!authed) {
      navigate('/admin/login')
      return
    }
    fetchCRMData()
  }, [navigate])

  const fetchCRMData = async () => {
    setLoading(true)
    try {
      // Fetch deals
      const { data: dealsData, error: dealsError } = await supabase
        .from('crm_deals')
        .select('*')
        .order('created_at', { ascending: false })

      if (dealsError) throw dealsError

      // Fetch contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('crm_contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (contactsError) throw contactsError

      setDeals(dealsData || [])
      setContacts(contactsData || [])

      // Calculate stats
      const openDeals = (dealsData || []).filter(
        (d) => d.status !== 'closed_won' && d.status !== 'closed_lost'
      ).length

      const pipelineValue = (dealsData || [])
        .filter((d) => d.status !== 'closed_won' && d.status !== 'closed_lost')
        .reduce((sum, deal) => {
          const valueStr = deal.value || '£0'
          const numericValue = parseFloat(valueStr.replace(/[£,]/g, '')) || 0
          return sum + numericValue
        }, 0)

      const activeContacts = (contactsData || []).filter(
        (c) => c.status !== 'archived'
      ).length

      setStats({
        openDeals,
        pipelineValue,
        activeContacts,
      })
    } catch (error) {
      console.error('Error fetching CRM data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('lunar_admin_authed')
    }
    navigate('/admin/login')
  }

  const formatCurrency = (value) => {
    return `£${value.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-medium-contrast">Loading CRM data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold heading-serif text-primary">
              Lunar Admin
            </h1>
            <p className="text-xs text-medium-contrast">
              CMS &amp; CRM overview for Lunar Antiques
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-light-contrast">
                  Open Deals
                </p>
                <p className="text-2xl font-semibold text-high-contrast mt-1">
                  {stats.openDeals}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CircleDot className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-light-contrast">
                  Pipeline Value
                </p>
                <p className="text-2xl font-semibold text-high-contrast mt-1">
                  {formatCurrency(stats.pipelineValue)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-light-contrast">
                  Active Contacts
                </p>
                <p className="text-2xl font-semibold text-high-contrast mt-1">
                  {stats.activeContacts}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Contact2 className="h-5 w-5 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deals board */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold heading-serif text-high-contrast">
              Deals Pipeline
            </h2>
            <p className="text-xs text-medium-contrast">
              Visualise leads, negotiations, and closed pieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['lead', 'negotiation', 'closed_won'].map((status) => {
              const statusDeals = deals.filter((deal) => deal.status === status)
              return (
                <Card key={status} className="bg-white/70">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-high-contrast">
                        {STATUS_LABELS[status]}
                      </h3>
                      <span className="text-xs text-light-contrast">
                        {statusDeals.length} deal{statusDeals.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {statusDeals.length === 0 ? (
                        <p className="text-xs text-light-contrast text-center py-4">
                          No deals in this stage
                        </p>
                      ) : (
                        statusDeals.map((deal) => (
                          <div
                            key={deal.id}
                            className="border border-border rounded-lg p-3 bg-white"
                          >
                            <p className="text-sm font-semibold text-high-contrast">
                              {deal.title}
                            </p>
                            <p className="text-xs text-medium-contrast mt-1">
                              {deal.value || 'No value'}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-light-contrast">
                                Owner: {deal.owner || 'Unassigned'}
                              </span>
                              <span
                                className={`text-[11px] px-2 py-0.5 rounded-full border ${STATUS_STYLES[status]}`}
                              >
                                {STATUS_LABELS[status]}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Contacts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold heading-serif text-high-contrast">
              Key Contacts
            </h2>
            <p className="text-xs text-medium-contrast">
              Designers, collectors, and repeat clients.
            </p>
          </div>
          <Card>
            <CardContent className="p-4">
              {contacts.length === 0 ? (
                <p className="text-sm text-light-contrast text-center py-4">
                  No contacts yet. Contacts from the contact form will appear here.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="border border-border rounded-lg p-3 bg-white/80 flex items-start justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-high-contrast">
                          {contact.name}
                        </p>
                        <p className="text-xs text-medium-contrast">
                          {contact.email}
                        </p>
                        {contact.inquiry_type && (
                          <p className="text-xs text-light-contrast mt-1">
                            {contact.inquiry_type}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5 mb-1">
                          <BadgeCheck className="h-3 w-3 mr-1" />
                          {contact.status || 'new'}
                        </span>
                        {contact.created_at && (
                          <p className="text-[11px] text-light-contrast">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Quick links to CMS sections */}
        <section>
          <h2 className="text-lg font-semibold heading-serif text-high-contrast mb-3">
            Manage Site Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-high-contrast">
                    Collection CMS
                  </p>
                  <p className="text-xs text-medium-contrast mt-1">
                    Add and edit collection items and their images.
                  </p>
                </div>
                <Link to="/admin/collection">
                  <Button size="sm" className="flex items-center">
                    <LayoutGrid className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-high-contrast">
                    Services CMS
                  </p>
                  <p className="text-xs text-medium-contrast mt-1">
                    Manage services listed on the Services page.
                  </p>
                </div>
                <Link to="/admin/services">
                  <Button size="sm" className="flex items-center">
                    <Hammer className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard
